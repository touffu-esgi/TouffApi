import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { AddReportDto } from '../../dto/add-report.dto';
import { ReportService } from '../../application/report.service';
import { ReportAdapter } from '../../adapters/report.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';
import { Request } from 'express';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post('')
  @HttpCode(201)
  async reportUser(@Body() addReportDto: AddReportDto) {
    // const reportsFor = await this;
  }

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
}
