import { ReportRepository } from '../domain/report.repository';
import { Report } from '../domain/report';

export class ReportRepositoryInMemory implements ReportRepository {
  reports: Report[] = [
    new Report('1', '1', '2', 'Fake'),
    new Report('1', '3', '2', 'Fake one'),
    new Report('1', '1', '3', 'Pas très très gentil'),
  ];

  async getReportsByUser(reportedUserId: string): Promise<Report[]> {
    return this.reports.filter(
      (report) => report.reportedUserId === reportedUserId,
    );
  }

  async getReportsCountByUser(): Promise<unknown> {
    const reportsCount = {};
    this.reports.forEach((report) => {
      if (report.active) {
        const rCount = reportsCount[report.reportedUserId];
        reportsCount[report.reportedUserId] = rCount ? rCount + 1 : 1;
      }
    });
    return reportsCount;
  }

  add(report: Report): Promise<Report> {
    throw new Error('Not implemented');
  }

  getNextId(): string {
    return this.reports.at(-1).id;
  }
}
