import React, { useEffect, useState } from 'react';
import { FormatTypes, ReportTypes } from '../patterns/structural/bridge';
import { ReportForm } from '../components/pattern-pages/bridge/ReportForm';
import { FormItemElement, FormValues, NumberOptionsMapping } from '../components/pattern-pages/bridge/types';

const initialValues = {
  'first-name': '',
  'last-name': '',
  days: 0,
  planned: 0,
  completed: 0,
  comment: ''
};

const DAYS_OPTIONS_MAPPING: NumberOptionsMapping = {
  [ReportTypes.YEARLY]: [365, 366],
  [ReportTypes.MONTHLY]: [31, 30, 29, 28],
  [ReportTypes.DAILY]: [1]
};

export default function BridgePage(): JSX.Element {
  const [format, setFormat] = useState<string>(FormatTypes.PDF);
  const [reportType, setReportType] = useState<string>(ReportTypes.YEARLY);
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const daysOptions = DAYS_OPTIONS_MAPPING[reportType] || [];

  useEffect(() => {
    setFormValues({ ...formValues, days: daysOptions[0] });
  }, [reportType]);

  const changeFormat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(event.target.value);
  };

  const changeReportType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReportType(event.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<FormItemElement>) => {
    const { name, value } = e.target;
    const newValue = ['days', 'planned', 'completed'].includes(name) ? Number(value) : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  const generateReport = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('formValues', formValues);
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
      <ReportForm reportType={reportType} generateReport={generateReport} handleInputChange={handleInputChange} formValues={formValues} daysOptions={daysOptions}/>
    </div>
  );
}
