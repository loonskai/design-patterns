import { ISubject, IObserver } from './index';

class NewsLetter implements ISubject {
  private paperTitle: string;

  public editions: string[] = []; /* Subject state */

  private observers: IObserver[] = [];

  constructor(paperTitle: string) {
    this.paperTitle = paperTitle;
  }

  public attach(observer: IObserver): void {
    if (this.observers.includes(observer)) {
      return console.log('Person is already subscribed for this newsletter.');
    }
    this.observers.push(observer);
  }

  public detach(observer: IObserver): void {
    if (!this.observers.includes(observer)) {
      return console.log('Person does not have subscription.');
    }
    this.observers = this.observers.filter(subscribedObserver => subscribedObserver !== observer);
  }

  public notify(): void {
    this.observers.forEach(subscribedObserver => {
      subscribedObserver.update(this);
    });
  }

  public issueNewEdition(editionTitle: string): void {
    this.editions.push(editionTitle);

    console.log('---');
    console.log(`*** ${this.paperTitle} edition: ${editionTitle} ***`);
    console.log('---');

    this.notify();
  }

  public getLastEdition() {
    return this.editions[this.editions.length - 1];
  }
}

/* People */
class Person implements IObserver {
  private name: string;

  private notification: string;

  constructor(name: string, notification: string) {
    this.name = name;
    this.notification = notification;
  }

  update(newsLetter: NewsLetter) {
    console.log(`${this.name} -> ${this.notification}: ${newsLetter.getLastEdition()}`);
  }
}

/* Create newsletters */
const WPNewsletter = new NewsLetter('Washington Post');
const NYTNewsletter = new NewsLetter('New York Times');

/* Create persons */
const john = new Person('John', 'Here is a new paper for you');
const jane = new Person('JANE', 'Newspapers update');
const michael = new Person('Michael', 'GOOD MORNING!');

/* Subscribe */
WPNewsletter.attach(john);
WPNewsletter.attach(michael);

NYTNewsletter.attach(jane);
NYTNewsletter.attach(john);

/* Issue editions */
NYTNewsletter.issueNewEdition('Tractor and vodka will cure from coronavirus');
WPNewsletter.issueNewEdition('Protests orchestrated from abroad, criminals involved');

/* Unsubscribe */
NYTNewsletter.detach(jane);
NYTNewsletter.detach(john);

NYTNewsletter.issueNewEdition('Last edition of NYT');
