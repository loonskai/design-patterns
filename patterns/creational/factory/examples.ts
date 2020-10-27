/* Objects factory */
function userFactory(name, group, email) {
  return { name, group, email };
}

/* Functions factory */
const colors = {
  info: '\x1b[1;37m',
  warning: '\x1b[1;33m',
  error: '\x1b[0;31m',
};

function logger(type = 'info') {
  const color = colors[type];
  const date = new Date().toISOString();

  return str => {
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

  constructor(name) {
    this.name = name;
  }

  static createPerson(name) {
    return new Person(name);
  }
}

const john = Person.createPerson('John');
console.log(john.name);
