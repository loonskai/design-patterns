import { DocumentFormat, ReportTypeInfo } from './index';
import { jsPDF } from 'jspdf';

export class PDFDocument implements DocumentFormat {
  async create(data: any, reportTypeInfo: ReportTypeInfo = {}): Promise<void> {
    const doc = new jsPDF();
    doc.text(reportTypeInfo.title || '', 10, 10);
    doc.text(`First Name: ${data['first-name']}`, 10, 30);
    doc.text(`Last Name: ${data['last-name']}`, 10, 50);
    doc.text(`Tasks planned: ${data.planned}`, 10, 70);
    doc.text(`Tasks completed: ${data.completed}`, 10, 90);
    doc.text(`Productivity: ${data.completed / data.planned * 100}%`, 10, 110);
    doc.text(`Comment: ${data.comment}`, 10, 130);
    doc.save(reportTypeInfo.docName);
  }
}
