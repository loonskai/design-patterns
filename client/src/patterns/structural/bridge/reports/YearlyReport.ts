import { Report, ReportData, ReportDocument } from './index';

export class YearlyReport extends Report {
  protected prepare(data: ReportData): ReportDocument {
    return {
      title: `This is your productivity report for ${this.getCurrentYear()}`, 
      docName: `${this.getCurrentYear()}-report`,
      ...this.prepareReportFields(data)
    };
  }

  private getCurrentYear(): string {
    return `${new Date().getFullYear()}`;
  }
}
