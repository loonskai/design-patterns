export interface ISubject {
  attach(observer: IObserver): void;
  detach(observer: IObserver): void;
  notify(): void;
}

export interface IObserver {
  update(subject: ISubject): void;
}

class ConcreteSubject implements ISubject {
  public state = 0;

  private observers: IObserver[] = [];

  public attach(observer: IObserver): void {
    if (this.observers.includes(observer)) {
      return console.log('Subject: Observer already has been subscribed.');
    }
    this.observers.push(observer);
  }

  public detach(observer: IObserver): void {
    if (!this.observers.includes(observer)) {
      return console.log('Subject: Observer does not exist.');
    }
    this.observers = this.observers.filter(subscribedObserver => subscribedObserver !== observer);
  }

  public notify(): void {
    this.observers.forEach(subscribedObserver => {
      subscribedObserver.update(this);
    });
  }

  public setRandomInt(min: number, max: number): void {
    const minNum = Math.ceil(min);
    const maxNum = Math.floor(max);
    this.state = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

    this.notify();
  }
}

class FirstConcreteObserver implements IObserver {
  update(subject: ISubject) {
    if (subject instanceof ConcreteSubject && subject.state <= 2) {
      console.log('FirstConcreteObserver reaction on subject.state change.');
      console.log('subject.state === ', subject.state);
      console.log('------');
    }
  }
}

class SecondConcreteObserver implements IObserver {
  update(subject: ISubject) {
    if (subject instanceof ConcreteSubject && subject.state > 2) {
      console.log('SecondConcreteObserver reaction on subject.state change.');
      console.log('subject.state === ', subject.state);
      console.log('------');
    }
  }
}

/* Test implementation */

const subject = new ConcreteSubject();

const firstObserver = new FirstConcreteObserver();
subject.attach(firstObserver);

const secondObserver = new SecondConcreteObserver();
subject.attach(secondObserver);

subject.setRandomInt(0, 5);
subject.setRandomInt(0, 5);
subject.setRandomInt(0, 5);
subject.setRandomInt(0, 5);
subject.setRandomInt(0, 5);

console.log('** detach secondObserver **');
subject.detach(secondObserver);

subject.setRandomInt(0, 5);
subject.setRandomInt(0, 5);
subject.setRandomInt(0, 5);
subject.setRandomInt(0, 5);
subject.setRandomInt(0, 5);
