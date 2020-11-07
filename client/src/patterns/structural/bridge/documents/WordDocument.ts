import { Packer, Document, Paragraph, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { DocumentFormat, ReportTypeInfo } from './index';

export class WordDocument implements DocumentFormat {
  async create(data: any, reportTypeInfo: ReportTypeInfo = {}) {
    console.log('Creating Word document with data:');
    
    const doc = new Document();
    doc.addSection({
      children: [
        new Paragraph({
          text: reportTypeInfo.title || '',
          heading: HeadingLevel.HEADING_1,
          thematicBreak: true,
        }),
        new Paragraph(`Planned tasks: ${data.planned}`),
        new Paragraph(`Completed tasks: ${data.completed}`),
      ]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${reportTypeInfo.docName || 'name'}.docx`);
  }
}
