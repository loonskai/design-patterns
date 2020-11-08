import { ReportDocument } from '../reports';

export type DocumentData = ReportDocument;

export interface DocumentFormat {
  create(data: DocumentData): void
}
