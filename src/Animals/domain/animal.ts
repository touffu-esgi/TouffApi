export class Animal {
  private readonly _name: string;
  private readonly _type: string;
  private readonly _id: string;
  private readonly _recipientId: string;

  constructor(name: string, type: string, id: string, recipientId: string) {
    this._name = name;
    this._type = type;
    this._id = id;
    this._recipientId = recipientId;
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

  get recipientId(): string {
    return this._recipientId;
  }
}
