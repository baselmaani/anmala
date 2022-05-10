import { BodyParams } from '@tsed/common';
import { Controller } from '@tsed/di';
import { Get, Groups, Post, Returns, Summary } from '@tsed/schema';
import { TokenResultType, UserInput } from 'src/models/UserModel';
import { AuthService } from 'src/services/AuthService';

@Controller('/auth')
export class AuthController {
  @Get('/')
  get() {
    return 'hello';
  }

  @Post('/')
  @Summary('Create a new user')
  @Returns(201, TokenResultType)
  async insert(@BodyParams() @Groups('creation') user: UserInput) {
    return AuthService.login(user.email, user.password, 'normal');
  }
}
