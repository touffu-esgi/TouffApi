import { Injectable } from '@nestjs/common';
import { ReportRepositoryInMemory } from '../persistence/report.repository.in-memory';
import { Report } from '../domain/report';

@Injectable()
export class ReportService {
  constructor(private reportRepository: ReportRepositoryInMemory) {}

  async getReportsByUser(reportedUserId: string): Promise<Report[]> {
    return await this.reportRepository.getReportsByUser(reportedUserId);
  }

  async getReportsCountByUser(): Promise<unknown> {
    return await this.reportRepository.getReportsCountByUser();
  }
}
