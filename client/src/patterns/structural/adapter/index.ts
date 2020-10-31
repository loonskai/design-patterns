interface Adaptee {
  coll(): any;
}

class Adaptee implements Adaptee {
  coll() {
    console.log('from Adaptee');
  }
}

export class Adapter {
  private adaptee: Adaptee; // or subject

  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }

  call(): void {
    this.adaptee.coll();
  }
}

export const adapter = new Adapter(new Adaptee());
