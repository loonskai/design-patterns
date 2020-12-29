import { DocumentFormat } from '../documents';

export type ReportData = {
  'first-name': string;
  'last-name': string;
  planned: number;
  completed: number;
  comment: string;
}

type DocumentUserInfo = {
  label: string;
  value: string;
}

type ReportDocumentDataField = {
  label: string;
  value: string | number;
}

type ReportDocumentData = {
  userInfo: DocumentUserInfo[];
  fields: ReportDocumentDataField[];
  comment?: string;
}

type ReportTypeDocumentData = {
  title: string;
  docName: string;
}

export type ReportDocument = ReportDocumentData & ReportTypeDocumentData

export abstract class Report {
  protected document: DocumentFormat

  constructor(document: DocumentFormat) {
    this.document = document;
  }

  public generate(data: ReportData): void {
    this.document.create(this.prepare(data));
  }

  protected prepare(data: ReportData): ReportDocument {
    return {
      title: 'Your productivity report', 
      docName: 'report',
      ...this.prepareReportFields(data)
    };
  }

  protected prepareReportFields(data: ReportData): ReportDocumentData {
    return {
      userInfo: [
        {
          label: 'First Name',
          value: data['first-name']
        },
        {
          label: 'Last Name',
          value: data['last-name']
        }
      ],
      fields: [
        {
          label: 'Tasks planned',
          value: data.planned
        },
        {
          label: 'Tasks completed',
          value: data.completed
        },
        {
          label: 'Productivity',
          value: data.completed / data.planned * 100
        }
      ],
      comment: data.comment
    };
  }
}
