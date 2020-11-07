import { Packer, Document, Table, TableRow, TableCell, TextRun, Paragraph, WidthType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { DocumentFormat, ReportTypeInfo } from './index';

export class WordDocument implements DocumentFormat {
  async create(data: any, reportTypeInfo: ReportTypeInfo = {}): Promise<void> {
    console.log(data);
    const doc = new Document();
    const heading = new Paragraph({
      text: reportTypeInfo.title || '',
      heading: HeadingLevel.TITLE,
      thematicBreak: true,
    });
    const userInfo = [
      new Paragraph({
        children: [
          new TextRun({ text: 'First Name: ' }),
          new TextRun({ text: data['first-name'], bold: true })
        ]
      }),
      new Paragraph({
        children: [
          new TextRun({ text: 'Last Name: ' }),
          new TextRun({ text: data['last-name'], bold: true })
        ]
      })
    ];
    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Planned tasks')],
              width: { size: 500, type: WidthType.DXA }
            }),
            new TableCell({
              children: [new Paragraph(`${data.planned}`)],
              width: { size: 500, type: WidthType.DXA }
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Completed tasks')],
              width: { size: 50, type: WidthType.PERCENTAGE }
            }),
            new TableCell({
              children: [new Paragraph(`${data.completed}`)],
              width: { size: 50, type: WidthType.PERCENTAGE }
            })
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('Productivity')],
              width: { size: 50, type: WidthType.PERCENTAGE }
            }),
            new TableCell({
              children: [new Paragraph(`${data.completed / data.planned * 100}%`)],
              width: { size: 50, type: WidthType.PERCENTAGE }
            })
          ]
        })
      ]
    });
    const comment = new Paragraph({ 
      children: [
        new TextRun({ text: 'Comment: ', bold: true }),
        new TextRun(data.comment)
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
    saveAs(blob, `${reportTypeInfo.docName}.docx`);
  }
}
