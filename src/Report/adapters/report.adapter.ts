import { Report } from '../domain/report';
import { ReportResponse } from '../domain/report.response';

export class ReportAdapter {
  public static toReportResponse(
    report: Report,
    baseUrl: string,
  ): ReportResponse {
    return new ReportResponse(
      report.id,
      `${baseUrl}/user/${report.reportedUserId}`,
      `${baseUrl}/user/${report.reportedUserId}`,
      report.dateReported,
      report.comment,
    );
  }
}
