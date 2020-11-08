import axios from 'axios';

// abstract class Beverage {
//   public abstract cost(): number 
// }

// export class Espresso extends Beverage {
//   public cost(): number {
//     return 2;
//   }
// }

// abstract class AddonDecorator extends Beverage {
//   public abstract cost(): number 
// }

// export class Caramel extends AddonDecorator {
//   private beverage: Beverage

//   constructor(beverage: Beverage) {
//     super();
//     this.beverage = beverage;
//   }

//   cost(): number {
//     return this.beverage.cost() + 0.5;
//   }
// }

// function decorateMethod() {
//   return function(target: any, propertyKey: string, descriptor: any) {
//     target.foo();
//     console.log('target', target);
//     console.log('propertyKey', propertyKey);
//     console.log('descriptor', descriptor);
//   };
// }

// function decorateClass<T extends { new (...args: any[]): any }>(constructor: T) {
//   return class extends constructor {
//     baz = 'bar'
//   };
// }

// @decorateClass
// export class Foo {
//   public baz: string;

//   constructor() {
//     this.baz = 'baz';
//   }

//   @decorateMethod()
//   foo(): void {
//     console.log(this.baz);
//   }
// }

