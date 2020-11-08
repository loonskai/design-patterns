import { DocumentFormat, DocumentData } from './index';
import { jsPDF } from 'jspdf';

export class PDFDocument implements DocumentFormat {
  async create(data: DocumentData): Promise<void> {
    const doc = new jsPDF();

    let yPosition = 0;

    doc.text(data.title, 10, yPosition += 20);

    data.userInfo.forEach(infoItem => {
      doc.text(`${infoItem.label}: ${infoItem.value}`, 10, yPosition += 20);
    });

    data.fields.forEach(field => {
      doc.text(`${field.label}: ${field.value}`, 10, yPosition += 20);
    });

    doc.text(`Comment: ${data.comment}`, 10, yPosition += 20);

    doc.save(data.docName);
  }
}
