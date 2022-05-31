import { RecipientRepository } from '../domain/recipient.repository';
import { Recipient } from '../domain/recipient';

export class RecipientRepositoryInMemory implements RecipientRepository {
  private readonly recipients: Recipient[] = [
    new Recipient(
      '1',
      'nathan',
      'letourneau',
      'nathan@nathan.fr',
      '0000000000',
      '123456789',
      '78 rue de paris à paris',
    ),
  ];

  async save(recipient: Recipient): Promise<Recipient> {
    this.recipients.push(recipient);
    return recipient;
  }

  async getAll(): Promise<Recipient[]> {
    return this.recipients;
  }

  async getNextId() {
    const constLastAnimal = +this.recipients.at(-1).id;
    return (constLastAnimal + 1).toString();
  }
}
