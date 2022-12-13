export class AnimalResponse {
  constructor(name, type, id, recipientId) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.recipientId = recipientId;
  }
  id: string;
  name: string;
  type: string;
  recipientId: string;
}
