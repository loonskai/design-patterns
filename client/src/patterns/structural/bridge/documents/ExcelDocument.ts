import ExcelJS from 'exceljs';
import { DocumentFormat, ReportTypeInfo } from './index';

export class ExcelDocument implements DocumentFormat {
  async create(data: any, reportTypeInfo: ReportTypeInfo = {}): Promise<void> {
    const workBook = new ExcelJS.Workbook();
    const workSheet = workBook.addWorksheet('Sheet1', { headerFooter: { firstHeader: reportTypeInfo.title || '' } });
    workSheet.addRow(['First Name', data['first-name']]);
    workSheet.addRow(['Last Name', data['last-name']]);
    workSheet.addRow(['Tasks planned', data.planned]);
    workSheet.addRow(['Tasks completed', data.completed]);
    workSheet.addRow(['Productivity', data.completed]);
    workSheet.fillFormula('B:6', 'B4 / B5 * 100');
    workSheet.addRow(['Comment', data.comment]);

    const buf = await workBook.xlsx.writeBuffer();
    saveAs(new Blob([buf]), `${reportTypeInfo.docName}.xlsx`);
  }
}
