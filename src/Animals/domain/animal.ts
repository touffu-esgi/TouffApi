export class Animal {
  private readonly _name: string;
  private readonly _type: string;

  constructor(name: string, type: string) {
    this._name = name;
    this._type = type;
  }

  get name(): string {
    return this._name;
  }

  get type(): string {
    return this._type;
  }
}
