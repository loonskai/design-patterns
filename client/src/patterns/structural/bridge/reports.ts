import { DocumentFormat } from './documents';

abstract class Report {
  protected document: DocumentFormat

  constructor(document: DocumentFormat) {
    this.document = document;
  }

  public generate(data: any) {
    this.document.create(data);
  }
}

export class YearlyReport extends Report {
  public generate(data: any) {
    console.log('Generate yearly report:');
    this.document.create(data, { title: 'This is your activity report for one year'});
  }
}

export class MonthlyReport extends Report {
  public generate(data: any) {
    console.log('Generate monthly report:');
    this.document.create(data, { title: 'Check your monthly report'});
  }
}

export class DailyReport extends Report {
  public generate(data: any) {
    console.log('Generate daily report:');
    this.document.create(data, { title: 'Your daily activity', docName: 'daily-report'});
  }
}
