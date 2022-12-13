import { ReportRepository } from '../domain/report.repository';
import { Report } from '../domain/report';
import { HasAlreadyReportedException } from '../application/exceptions/has-already-reported.exception';

export class ReportRepositoryInMemory implements ReportRepository {
  reports: Report[] = [
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

  async add(report: Report): Promise<Report> {
    const hasAlreadyReported = this.reports.filter(
      (r) =>
        r.reportedUserId === report.reportedUserId &&
        r.reportedByUserId === report.reportedByUserId &&
        r.active === report.active,
    );
    if (hasAlreadyReported.length > 0) {
      throw new HasAlreadyReportedException(
        `User ${report.reportedByUserId} has already reported user ${report.reportedUserId}`,
      );
    }
    this.reports.push(report);
    return report;
  }

  getNextId(): string {
    return this.reports.at(-1).id;
  }
}
