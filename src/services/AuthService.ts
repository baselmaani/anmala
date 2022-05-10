import { EmailService } from './EmailService';
import { GenerateTokenInput } from './../models/UserModel';
import { PrismaService } from 'src/services/PrismaService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { addMinutes } from 'date-fns';
import { uid } from 'rand-token';

export class AuthService {
  static async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  static async generateToken(user: GenerateTokenInput) {
    return await jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        tel: user.tel,
      },
      process.env.SECRET || '123',
      {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
      }
    );
  }

  static async verifyToken(token: string) {
    return await jwt.verify(token, process.env.SECRET || '123');
  }

  static async getUserByToken(token: string) {
    const user = await AuthService.verifyToken(token);
    return user;
  }
  static async login(email: string, password: string, role: string) {
    const prisma = new PrismaService();
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        role: true,
      },
    });
    prisma.$disconnect();

    if (!user || user.role.name !== role) {
      throw new Error('user is not exist or not have permission');
    }
    const isMatch =
      user && user.password !== null && user.password !== ''
        ? await this.comparePassword(password, user.password)
        : false;

    if (!isMatch) {
      throw new Error('password  did not match');
    }

    const token = await this.generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      tel: user.tel || '',
    });
    return { token };
  }

  static async requestChangePassword(email: string) {
    const prisma = new PrismaService();
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('user is not exist');
    }
    const token = uid(12);

    await prisma.resetToken.create({
      data: {
        userId: user.id,
        expires: addMinutes(new Date(), 30),
        token,
        isValid: true,
      },
    });
    prisma.$disconnect();

    const sendedEmail = await EmailService.sendEmail({
      from: process.env.EMAIL_SENDER || '',
      to: email,
      subject: 'Change Password',
      text: '',
      html: `<h1>Change Password</h1>
        <p>your request code to change password is </p>
        <a href='${process.env.ADMIN_URL}/reset/${token}'>${token}</a>
        `,
      attachments: [],
    });
    return sendedEmail;
  }

  static async changePassword(token: string, email: string, password: string) {
    const prisma = new PrismaService();
    const userByEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!userByEmail) {
      throw new Error('user is not exist');
    }
    const resetToken = await prisma.resetToken.findFirst({
      where: {
        token,
        userId: userByEmail.id,
        isValid: true,
      },
    });
    if (!resetToken) {
      throw new Error('token is not valid');
    }
    const hashedPassword = await this.hashPassword(password);
    await prisma.user.update({
      where: {
        id: userByEmail.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    const sendedEmail = await EmailService.sendEmail({
      from: 'Admin',
      to: email,
      subject: 'Change Password',
      text: '',
      html: `<h1>Change Password</h1>
        <p>your password is changed successfully you can login </p>
        <a href='${process.env.ADMIN_URL}/login/'> Login</a>
        `,
      attachments: [],
    });
    return sendedEmail;
  }

  static async validateResetToken(token: string) {
    const prisma = new PrismaService();

    const tkn = await prisma.resetToken.findFirst({
      where: {
        token,
        isValid: true,
        expires: {
          gte: new Date(),
        },
      },
    });
    return { isValid: tkn ? true : false };
  }
}
