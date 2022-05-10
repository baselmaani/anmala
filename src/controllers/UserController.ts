import { UserInput } from './../models/UserModel';
import { EmailService } from './../services/EmailService';
import { PrismaClient } from '@prisma/client';
import { BodyParams, PathParams, QueryParams } from '@tsed/common';
import { Controller, Inject } from '@tsed/di';
import {
  Delete,
  Get,
  Groups,
  number,
  Post,
  Put,
  Returns,
  Summary,
} from '@tsed/schema';
import { UserModel } from 'src/models/UserModel';
import { AuthService } from 'src/services/AuthService';
import { Authorize } from '@tsed/passport';

@Controller('/users')
export class UserController {
  @Inject()
  protected prisma: PrismaClient;

  @Get('/all')
  @Summary('Return list of users by ids')
  @Returns(200, Array).Of(UserModel)
  async getAll() {
    await EmailService.sendEmail({
      from: 'bot@ljungskile-bil.se',
      to: 'mohmmedmaani@hotmail.com',
      text: 'hello',
      html: '<h2>hello</h2>',
      subject: 'test email',
      attachments: [],
    });
    return this.prisma.user.findMany();
  }

  @Get('/many')
  @Authorize('admin')
  @Summary('Return list of users by ids')
  @Returns(200, Array).Of(UserModel)
  getManyById(@QueryParams('id') id: string[]) {
    return this.prisma.user.findMany({
      where: { id: { in: id.map((c) => parseInt(c)) } },
    });
  }

  @Get('/:id')
  @Summary('Return user by id')
  @Returns(200, UserModel)
  getOne(@PathParams() params: { id: number }) {
    const { id } = params;
    return this.prisma.user.findFirst({ where: { id } });
  }

  @Post('/')
  @Summary('Create a new user')
  @Returns(201, Array).Of(number)
  async insert(@BodyParams() @Groups('creation') user: UserInput) {
    console.log('user', user);
    const hashedPassword = await AuthService.hashPassword(user.password);
    return this.prisma.user.create({
      data: { ...user, password: hashedPassword, roleId: 1 },
    });
  }

  @Put('/:id')
  @Summary('update one user by id')
  @Returns(201, UserModel)
  async update(
    @BodyParams() @Groups('creation') user: UserModel,
    @PathParams('id') id: string
  ) {
    return this.prisma.user.update({
      where: { id: parseInt(id) },
      data: user,
    });
  }

  @Put('/')
  @Summary('update many users by ids')
  @Returns(201, Array).Of(UserModel)
  async updateMany(
    @BodyParams() user: UserModel,
    @QueryParams('filter') filter: string[]
  ) {
    return this.prisma.user.updateMany({
      where: {
        id: { in: filter.map((c) => parseInt(c)) },
      },
      data: user,
    });
  }

  @Delete('/:id')
  @Summary('Delete one user by id')
  @Returns(200, Array).Of(UserModel)
  delete(@PathParams('id') id: string) {
    return this.prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  @Delete('/')
  @Summary('Delete many user by ids')
  @Returns(200, Array).Of(UserModel)
  deleteMany(@BodyParams('ids') ids: string[]) {
    console.log('ids', ids);
    return this.prisma.user.deleteMany({
      where: {
        id: {
          in: ids.map((c) => parseInt(c)),
        },
      },
    });
  }
}
