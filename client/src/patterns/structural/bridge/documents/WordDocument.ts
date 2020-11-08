import { Packer, Document, Table, TableRow, TableCell, TextRun, Paragraph, WidthType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { DocumentFormat, DocumentData } from './index';

export class WordDocument implements DocumentFormat {
  async create(data: DocumentData): Promise<void> {
    const doc = new Document();

    const heading = new Paragraph({
      text: data.title || '',
      heading: HeadingLevel.TITLE,
      thematicBreak: true,
    });

    const userInfo = data.userInfo.map(infoItem => new Paragraph({
      children: [
        new TextRun({ text: `${infoItem.label}: ` }),
        new TextRun({ text: infoItem.value, bold: true })
      ]
    }));

    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: data.fields.map(field => new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(field.label)],
            width: { size: 500, type: WidthType.DXA }
          }),
          new TableCell({
            children: [new Paragraph(String(field.value))],
            width: { size: 500, type: WidthType.DXA }
          })
        ]
      }))
    });

    const comment = new Paragraph({ 
      children: [
        new TextRun({ text: 'Comment: ', bold: true }),
        new TextRun(data.comment || '')
      ]
    });

    doc.addSection({
      children: [
        heading,
        ...userInfo,
        table,
        comment
      ]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${data.docName}.docx`);
  }
}
