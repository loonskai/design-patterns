import { Report, ReportData, ReportDocument } from './index';

export class MonthlyReport extends Report {
  public generate(data: ReportData): void {
    this.document.create(this.prepare(data));
  }

  private prepare(data: ReportData): ReportDocument {
    return {
      title: `Check your ${this.getCurrentMonth()} productivity report`, 
      docName: `${this.getCurrentMonth()}-report`,
      ...this.prepareReportFields(data)
    };
  }

  private getCurrentMonth(): string {
    const MONTHS = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return MONTHS[new Date().getMonth()];
  }
}
