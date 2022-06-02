import { Recipient } from './recipient';

export interface RecipientRepository {
  save(recipient: Recipient): Promise<Recipient>;
  getAll(): Promise<Recipient[]>;
}
