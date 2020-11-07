import ExcelJS from 'exceljs';
import { DocumentFormat, ReportTypeInfo } from './index';

export class ExcelDocument implements DocumentFormat {
  async create(data: any, reportTypeInfo: ReportTypeInfo = {}): Promise<void> {
    console.log('Creating Excel document with data:');
    
    const wb = new ExcelJS.Workbook();

    const ws = wb.addWorksheet();

    const row = ws.addRow(['a', 'b', 'c']);
    row.font = { bold: true };

    const buf = await wb.xlsx.writeBuffer();

    saveAs(new Blob([buf]), 'abc.xlsx');
  }
}
