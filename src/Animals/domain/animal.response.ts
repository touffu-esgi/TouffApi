export class AnimalResponse {
  constructor(name, type, id) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
  id: string;
  name: string;
  type: string;
}
