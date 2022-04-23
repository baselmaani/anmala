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

@Controller('/users')
export class UserController {
  @Inject()
  protected prisma: PrismaClient;

  @Get('/all')
  @Summary('Return list of users by ids')
  @Returns(200, Array).Of(UserModel)
  getAll() {
    return this.prisma.user.findMany();
  }

  @Get('/many')
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
  getOne(@PathParams() params: { id: string }) {
    const { id } = params;
    return this.prisma.user.findFirst({ where: { id: parseInt(id) } });
  }

  @Post('/')
  @Summary('Create a new user')
  @Returns(201, Array).Of(number)
  async insert(@BodyParams() @Groups('creation') user: UserModel) {
    console.log('user', user);
    return this.prisma.user.create({ data: user });
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
