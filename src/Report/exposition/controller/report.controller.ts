import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { AddReportDto } from '../../dto/add-report.dto';
import { ReportService } from '../../application/report.service';
import { ReportAdapter } from '../../adapters/report.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';
import { Request } from 'express';
import { ReportExceptionFilter } from '../filters/report.exception.filter';

@Controller('report')
@UseFilters(new ReportExceptionFilter())
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get(':userId')
  async getReportsByUser(@Param('userId') userId: string, @Req() req: Request) {
    const reports = await this.reportService.getReportsByUser(userId);
    return reports.map((report) =>
      ReportAdapter.toReportResponse(report, HttpUtils.getBaseUrlOf(req)),
    );
  }

  @Get()
  async getReportsCountByUser() {
    return await this.reportService.getReportsCountByUser();
  }

  @Post()
  @HttpCode(201)
  async add(
    @Body() addReportDto: AddReportDto,
    @Req() req: Request,
  ): Promise<{ url: string }> {
    const report = await this.reportService.addReport(addReportDto);
    return {
      url: HttpUtils.getFullUrlOf(req) + '/' + report.reportedUserId,
    };
  }
}
