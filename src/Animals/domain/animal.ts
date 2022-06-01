export class Animal {
  private readonly _name: string;
  private readonly _type: string;
  private readonly _id: string;

  constructor(name: string, type: string, id: string) {
    this._name = name;
    this._type = type;
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  get type(): string {
    return this._type;
  }

  get id(): string {
    return this._id;
  }
}
