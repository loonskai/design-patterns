import { ReportDocument } from '../reports';

export type DocumentData = ReportDocument;

/* Realization */
export interface DocumentFormat {
  create(data: DocumentData): void
}
