import { Report } from './report';

export interface ReportRepository {
  getReportsByUser(reportedUserId: string): Promise<Report[]>;
  getReportsCountByUser(): Promise<unknown>;
  add(report: Report): Promise<Report>;
  getNextId(): string;
}
