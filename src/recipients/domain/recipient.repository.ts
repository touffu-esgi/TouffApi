import { Recipient } from './recipient';

export interface RecipientRepository {
  save(recipient: Recipient): Recipient;
}
