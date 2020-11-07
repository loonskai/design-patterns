export interface DocumentFormat {
  create(data: any): void
}

export class PDFDocument implements DocumentFormat {
  create(data: any) {
    console.log('Creating PDF document with data:');
    console.log(data);
  }
}

export class ExcelDocument implements DocumentFormat {
  create(data: any) {
    console.log('Creating Excel document with data:');
    console.log(data);
  }
}

export class WordDocument implements DocumentFormat {
  create(data: any) {
    console.log('Creating Word document with data:');
    console.log(data);
  }
}
