import { Recipient } from './Recipient';

export interface RecipientRepository {
  save(recipient: Recipient): Promise<Recipient>;
  getAll(): Promise<Recipient[]>;
  getOne(id: string): Promise<Recipient>;
}
