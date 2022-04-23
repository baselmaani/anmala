import { CategoryModel } from './../models/CategoryModel';
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

@Controller('/categories')
export class CategoryController {
  @Inject()
  protected prisma: PrismaClient;

  @Get('/all')
  @Summary('Return list of categories by ids')
  @Returns(200, Array).Of(CategoryModel)
  getAll() {
    return this.prisma.category.findMany();
  }

  @Get('/many')
  @Summary('Return list of categories by ids')
  @Returns(200, Array).Of(CategoryModel)
  getManyById(@QueryParams('id') id: string[]) {
    return this.prisma.category.findMany({
      where: { id: { in: id.map((c) => parseInt(c)) } },
    });
  }

  @Get('/:id')
  @Summary('Return category by id')
  @Returns(200, CategoryModel)
  getOne(@PathParams() params: { id: string }) {
    const { id } = params;
    return this.prisma.category.findFirst({ where: { id: parseInt(id) } });
  }

  @Post('/')
  @Summary('Create a new category')
  @Returns(201, Array).Of(number)
  async insert(@BodyParams() @Groups('creation') category: CategoryModel) {
    console.log('category', category);
    return this.prisma.category.create({ data: category });
  }

  @Put('/:id')
  @Summary('update one category by id')
  @Returns(201, CategoryModel)
  async update(
    @BodyParams() @Groups('creation') category: CategoryModel,
    @PathParams('id') id: string
  ) {
    return this.prisma.category.update({
      where: { id: parseInt(id) },
      data: category,
    });
  }

  @Put('/')
  @Summary('update many categories by ids')
  @Returns(201, Array).Of(CategoryModel)
  async updateMany(
    @BodyParams() category: CategoryModel,
    @QueryParams('filter') filter: string[]
  ) {
    return this.prisma.category.updateMany({
      where: {
        id: { in: filter.map((c) => parseInt(c)) },
      },
      data: category,
    });
  }

  @Delete('/:id')
  @Summary('Delete one category by id')
  @Returns(200, Array).Of(CategoryModel)
  delete(@PathParams('id') id: string) {
    return this.prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  @Delete('/')
  @Summary('Delete many category by ids')
  @Returns(200, Array).Of(CategoryModel)
  deleteMany(@BodyParams('ids') ids: string[]) {
    console.log('ids', ids);
    return this.prisma.category.deleteMany({
      where: {
        id: {
          in: ids.map((c) => parseInt(c)),
        },
      },
    });
  }
}
