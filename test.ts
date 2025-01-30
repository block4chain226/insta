class Person {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  public set name(value: string) {
    console.log('vadaskf;lslf;ls');

    if (value === 'v') {
      throw new Error('name');
    }
    this._name = value;
  }

  public get name() {
    return this._name;
  }
}

const person = new Person('v');
person.name = 'v';
console.log('🚀 ~ person:', person);
