/* Objects factory */
export function userFactory(name: any, group: any, email: any) {
  return { name, group, email };
}

/* Functions factory */
const colors = {
  info: '\x1b[1;37m',
  warning: '\x1b[1;33m',
  error: '\x1b[0;31m',
};

type TYPES = 'info' | 'warning' | 'error';

function logger(type: TYPES) {
  const color = colors[type];
  const date = new Date().toISOString();

  return (str: string) => {
    console.log(`${color}${date}\t${str}`);
  };
}

const logError = logger('error');
const logInfo = logger('info');
logError('Some error');
logInfo('Some information');

/* Fabric method */
class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  static createPerson(name: string) {
    return new Person(name);
  }
}

const john = Person.createPerson('John');
console.log(john.name);
