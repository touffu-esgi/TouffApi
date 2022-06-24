import { RecipientRepository } from '../domain/recipient.repository';
import { Recipient } from '../domain/recipient';
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore/lite';

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
    new Recipient(
      '2',
      'Lucille',
      'letourneau',
      'lucille@moineau.fr',
      '0000000000',
      '123456789',
      '3',
    ),
  ];

  async save(recipient: Recipient): Promise<Recipient> {
    this.recipients.push(recipient);
    return recipient;
  }

  async getAll(): Promise<Recipient[]> {
    return this.recipients;
  }

  async getOne(id: string): Promise<Recipient> {
    const recipients = this.recipients.filter((p) => p.id === id);
    if (recipients.length > 0) return recipients[0];
    throw new Error(`Recipient ${id} not found`);
  }

  getNextId(): string {
    const currentId = +this.recipients.at(-1).id;
    return (currentId + 1).toString();
  }
}
