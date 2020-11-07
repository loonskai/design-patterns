export type ReportTypeInfo = {
  title?: string
  docName?: string
}

export interface DocumentFormat {
  create(data: any, reportTypeInfo?: ReportTypeInfo): void
}
