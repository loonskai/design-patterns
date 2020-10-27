abstract class Creator {
  public abstract factoryMethod(): Product;

  public doSomething(): string {
    const product = this.factoryMethod();

    return product.runTask();
  }
}

class FirstConcreteCreator extends Creator {
  public factoryMethod(): Product {
    return new FirstConcreteProduct();
  }
}

class SecondConcreteCreator extends Creator {
  public factoryMethod(): Product {
    return new SecondConcreteProduct();
  }
}

interface Product {
  runTask(): string;
}

class FirstConcreteProduct implements Product {
  public runTask(): string {
    return 'Run FirstConcreteProduct task';
  }
}

class SecondConcreteProduct implements Product {
  public runTask(): string {
    return 'Run SecondConcreteProduct task';
  }
}

function clientCode(creator: Creator) {
  console.log(creator.doSomething());
}

clientCode(new FirstConcreteCreator());
clientCode(new SecondConcreteCreator());
