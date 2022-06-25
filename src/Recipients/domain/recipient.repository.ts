import { Recipient } from './Recipient';
import { RecipientProps } from '../persistence/mongoose-recipient-repository/recipient.schema';

export interface RecipientRepository {
  save(recipient: RecipientProps): Promise<Recipient>;
  getAll(): Promise<Recipient[]>;
  getOne(id: string): Promise<Recipient>;
}
