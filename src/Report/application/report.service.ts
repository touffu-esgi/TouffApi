import { Injectable } from '@nestjs/common';
import { ReportRepositoryInMemory } from '../persistence/report.repository.in-memory';
import { Report } from '../domain/report';
import { AddReportDto } from '../dto/add-report.dto';
import { CantReportOneselfException } from './exceptions/cant-report-oneself.exception';

@Injectable()
export class ReportService {
  constructor(private reportRepository: ReportRepositoryInMemory) {}

  async addReport(dto: AddReportDto): Promise<Report> {
    const newId = this.reportRepository.getNextId();
    const comment = dto.comment ? dto.comment : '';
    if (dto.reportedUserId === dto.reportingUserId)
      throw new CantReportOneselfException('You can not report yourself');
    const report = new Report(
      newId,
      dto.reportedUserId,
      dto.reportingUserId,
      comment,
    );
    return await this.reportRepository.add(report);
  }

  async getReportsByUser(reportedUserId: string): Promise<Report[]> {
    return await this.reportRepository.getReportsByUser(reportedUserId);
  }

  async getReportsCountByUser(): Promise<unknown> {
    return await this.reportRepository.getReportsCountByUser();
  }
}
