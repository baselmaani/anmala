import { Req } from '@tsed/common';
import { Arg, OnVerify, Protocol } from '@tsed/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PrismaService } from 'src/services/PrismaService';

type PayloadType = {
  id: number;
  name: string;
  email: string;
  tel: string;
};

@Protocol<StrategyOptions>({
  name: 'employee',
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  },
})
export class EmployeeProtocol implements OnVerify {
  constructor(private authService: PrismaService) {}

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: PayloadType) {
    const id: number = jwtPayload.id;
    const user = await this.authService.employee.findFirst({
      where: { id },
    });

    return user ? user : false;
  }
}
