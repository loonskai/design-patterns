import React, { useState } from 'react';
import { FormatTypes, ReportTypes } from '../patterns/structural/bridge';
import { ReportForm, FormItemElement } from '../components/pattern-pages/bridge/ReportForm';
import { ReportData } from '../patterns/structural/bridge/reports';
import { DailyReport } from '../patterns/structural/bridge/reports/DailyReport';
import { MonthlyReport } from '../patterns/structural/bridge/reports/MonthlyReport';
import { YearlyReport } from '../patterns/structural/bridge/reports/YearlyReport';
import { PDFDocument } from '../patterns/structural/bridge/documents/PDFDocument';
import { WordDocument } from '../patterns/structural/bridge/documents/WordDocument';
import { ExcelDocument } from '../patterns/structural/bridge/documents/ExcelDocument';

const initialValues = {
  'first-name': '',
  'last-name': '',
  planned: 0,
  completed: 0,
  comment: ''
};

const REPORT_TYPE_ABSTRACTIONS = {
  [ReportTypes.YEARLY]: YearlyReport,
  [ReportTypes.MONTHLY]: MonthlyReport,
  [ReportTypes.DAILY]: DailyReport
};

const DOCUMENT_FORMAT_IMPLEMENTATIONS = {
  [FormatTypes.PDF]: PDFDocument,
  [FormatTypes.EXCEL]: ExcelDocument,
  [FormatTypes.WORD]: WordDocument,
};

export default function BridgePage(): JSX.Element {
  const [format, setFormat] = useState<FormatTypes>(FormatTypes.PDF);
  const [reportType, setReportType] = useState<ReportTypes>(ReportTypes.YEARLY);
  const [formValues, setFormValues] = useState<ReportData>(initialValues);

  const changeFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value as FormatTypes);
  };

  const changeReportType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReportType(e.target.value as ReportTypes);
  };

  const handleInputChange = (e: React.ChangeEvent<FormItemElement>) => {
    const { name, value } = e.target;
    const newValue = ['planned', 'completed'].includes(name) ? Number(value) : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  const generateReport = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const ReportTypeClass = REPORT_TYPE_ABSTRACTIONS[reportType];
    const DocumentFormatClass = DOCUMENT_FORMAT_IMPLEMENTATIONS[format];

    const report = new ReportTypeClass(new DocumentFormatClass());
    await report.generate(formValues);
  };

  return (
    <div>
      <h1>Bridge</h1>
      <div>
        <label htmlFor="format">Format:</label>
        <select name="format" id="format" value={format} onChange={changeFormat}>
          <option value={FormatTypes.PDF}>PDF</option>
          <option value={FormatTypes.EXCEL}>Excel</option>
          <option value={FormatTypes.WORD}>Word</option>
        </select>
      </div>
      <div>
        <label htmlFor="report-type">Report Type:</label>
        <select name="report-type" id="report-type" value={reportType} onChange={changeReportType}>
          <option value={ReportTypes.YEARLY}>Yearly</option>
          <option value={ReportTypes.MONTHLY}>Monthly</option>
          <option value={ReportTypes.DAILY}>Daily</option>
        </select>
      </div>
      <ReportForm reportType={reportType} generateReport={generateReport} handleInputChange={handleInputChange} formValues={formValues}/>
    </div>
  );
}
