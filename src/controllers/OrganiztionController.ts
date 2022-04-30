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
import { OrganizationModel } from 'src/models/OrganizationModel';

@Controller('/orgnatizations')
export class OrganizationController {
  @Inject()
  protected prisma: PrismaClient;

  @Get('/all')
  @Summary('Return list of organizations by ids')
  @Returns(200, Array).Of(OrganizationModel)
  getAll() {
    return this.prisma.organization.findMany();
  }

  @Get('/many')
  @Summary('Return list of organizations by ids')
  @Returns(200, Array).Of(OrganizationModel)
  getManyById(@QueryParams('id') id: string[]) {
    return this.prisma.organization.findMany({
      where: { id: { in: id.map((c) => parseInt(c)) } },
    });
  }

  @Get('/:id')
  @Summary('Return organization by id')
  @Returns(200, OrganizationModel)
  getOne(@PathParams() params: { id: string }) {
    const { id } = params;
    return this.prisma.organization.findFirst({ where: { id: parseInt(id) } });
  }

  @Post('/')
  @Summary('Create a new organization')
  @Returns(201, Array).Of(number)
  async insert(
    @BodyParams() @Groups('creation') organization: OrganizationModel
  ) {
    console.log('organization', organization);
    return this.prisma.organization.create({ data: organization });
  }

  @Put('/:id')
  @Summary('update one organization by id')
  @Returns(201, OrganizationModel)
  async update(
    @BodyParams() @Groups('creation') organization: OrganizationModel,
    @PathParams('id') id: string
  ) {
    return this.prisma.organization.update({
      where: { id: parseInt(id) },
      data: organization,
    });
  }

  @Put('/')
  @Summary('update many organizations by ids')
  @Returns(201, Array).Of(OrganizationModel)
  async updateMany(
    @BodyParams() organization: OrganizationModel,
    @QueryParams('filter') filter: string[]
  ) {
    return this.prisma.organization.updateMany({
      where: {
        id: { in: filter.map((c) => parseInt(c)) },
      },
      data: organization,
    });
  }

  @Delete('/:id')
  @Summary('Delete one organization by id')
  @Returns(200, Array).Of(OrganizationModel)
  delete(@PathParams('id') id: string) {
    return this.prisma.organization.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  @Delete('/')
  @Summary('Delete many organization by ids')
  @Returns(200, Array).Of(OrganizationModel)
  deleteMany(@BodyParams('ids') ids: string[]) {
    console.log('ids', ids);
    return this.prisma.organization.deleteMany({
      where: {
        id: {
          in: ids.map((c) => parseInt(c)),
        },
      },
    });
  }
}
