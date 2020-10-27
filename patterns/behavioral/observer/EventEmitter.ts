class EventEmitter {
  private events: any = {};

  on(eventName: string, callback: (...args: any) => void) {
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }

  emit(eventName: string, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(cb => cb(...args));
    }
  }

  removeListener(eventName: string, callback: () => any) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(eventCallback => eventCallback !== callback)
    }
  }
} 

const emitter = new EventEmitter();

emitter.on('connect', port => {
  console.log(`Connected on ${port} port.`);
});

emitter.emit('connect', 3000);
