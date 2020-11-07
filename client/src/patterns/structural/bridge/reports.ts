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
  public generate(data: any): void {
    this.document.create(data, { 
      title: `This is your productivity report for ${this.getCurrentYear()}`, 
      docName: `${this.getCurrentYear()}-report` 
    });
  }

  private getCurrentYear(): string {
    return `${new Date().getFullYear()}`;
  }
}

export class MonthlyReport extends Report {
  public generate(data: any): void {
    this.document.create(data, { 
      title: `Check your ${this.getCurrentMonth()} productivity report`, 
      docName: `${this.getCurrentMonth()}-report` 
    });
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

export class DailyReport extends Report {
  public generate(data: any): void {
    this.document.create(data, { 
      title: `Your daily activity on ${this.getDate()}`, 
      docName: `${this.getTimestamp()}-report` 
    });
  }

  private getTimestamp(): string {
    return `${new Date().getTime()}`;
  }

  private getDate(): string {
    return new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric' });
  }
}
