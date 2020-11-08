import { Report, ReportData, ReportDocument } from './index';

export class DailyReport extends Report {
  protected prepare(data: ReportData): ReportDocument {
    return {
      title: `Your daily activity on ${this.getDate()}`, 
      docName: `${this.getTimestamp()}-report`,
      ...this.prepareReportFields(data)
    };
  }

  private getTimestamp(): string {
    return `${new Date().getTime()}`;
  }

  private getDate(): string {
    return new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
  }
}
