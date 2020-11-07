import { DocumentFormat, ReportTypeInfo } from './index';
import { jsPDF } from 'jspdf';

export class PDFDocument implements DocumentFormat {
  async create(data: any, reportTypeInfo: ReportTypeInfo = {}) {
    console.log('Creating PDF document with data:');
    
    const doc = new jsPDF();
    doc.text(reportTypeInfo.title || '', 10, 10);
    doc.save();
  }
}
