import { PrismaClient } from '@prisma/client';
import { ReportModel } from 'src/models/ReportModel';
import { BodyParams, PathParams, QueryParams } from '@tsed/common';

import { Inject, Controller } from '@tsed/di';

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

@Controller('/reports')
export class ReportController {
  @Inject()
  protected prisma: PrismaClient;

  @Get('/all')
  @Summary('Return list of categories by ids')
  @Returns(200, Array).Of(ReportModel)
  getAll() {
    return this.prisma.report.findMany();
  }

  @Get('/many')
  @Summary('Return list of organizations by ids')
  @Returns(200, Array).Of(ReportModel)
  getManyById(@QueryParams('id') id: string[]) {
    return this.prisma.report.findMany({
      where: { id: { in: id.map((c) => parseInt(c)) } },
    });
  }

  @Get('/:id')
  @Summary('Return user by id')
  @Returns(200, ReportModel)
  getOne(@PathParams() params: { id: string }) {
    const { id } = params;
    return this.prisma.report.findFirst({ where: { id: parseInt(id) } });
  }

  @Post('/')
  @Summary('Create a new report')
  @Returns(201, Array).Of(number)
  async insert(@BodyParams() @Groups('creation') report: ReportModel) {
    console.log('report', report);
    return this.prisma.report.create({ data: report });
  }

  @Put('/:id')
  @Summary('update one user by id')
  @Returns(201, ReportModel)
  async update(
    @BodyParams() @Groups('creation') report: ReportModel,
    @PathParams('id') id: string
  ) {
    return this.prisma.report.update({
      where: { id: parseInt(id) },
      data: report,
    });
  }

  @Put('/')
  @Summary('update many users by ids')
  @Returns(201, Array).Of(ReportModel)
  async updateMany(
    @BodyParams() report: ReportModel,
    @QueryParams('filter') filter: string[]
  ) {
    return this.prisma.report.updateMany({
      where: {
        id: { in: filter.map((c) => parseInt(c)) },
      },
      data: report,
    });
  }

  @Delete('/:id')
  @Summary('Delete one user by id')
  @Returns(200, Array).Of(ReportModel)
  delete(@PathParams('id') id: string) {
    return this.prisma.report.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  @Delete('/')
  @Summary('Delete many user by ids')
  @Returns(200, Array).Of(ReportModel)
  deleteMany(@BodyParams('ids') ids: string[]) {
    console.log('ids', ids);
    return this.prisma.report.deleteMany({
      where: {
        id: {
          in: ids.map((c) => parseInt(c)),
        },
      },
    });
  }
}
