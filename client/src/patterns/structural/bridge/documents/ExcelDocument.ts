import ExcelJS from 'exceljs';
import { DocumentFormat, DocumentData } from './index';

export class ExcelDocument implements DocumentFormat {
  async create(data: DocumentData): Promise<void> {
    const workBook = new ExcelJS.Workbook();
    const workSheet = workBook.addWorksheet(data.title, { headerFooter: { firstHeader: data.title } });

    data.userInfo.forEach(infoItem => {
      workSheet.addRow([infoItem.label, infoItem.value]);
    });
    
    data.fields.forEach(field => {
      workSheet.addRow([field.label, field.value]);
    });

    workSheet.addRow(['Comment', data.comment]);

    const buf = await workBook.xlsx.writeBuffer();
    saveAs(new Blob([buf]), `${data.docName}.xlsx`);
  }
}
