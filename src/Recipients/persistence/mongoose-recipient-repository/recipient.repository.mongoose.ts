import { RecipientRepository } from '../../domain/recipient.repository';
import { Recipient } from '../../domain/recipient';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecipientDocument } from './recipient.schema';

export class RecipientRepositoryMongoose implements RecipientRepository {
  constructor(
    @InjectModel('Recipients') private recipientModel: Model<RecipientDocument>,
  ) {}

  async getAll(): Promise<Recipient[]> {
    const recipients: RecipientDocument[] = await this.recipientModel
      .find()
      .exec();

    return recipients.map(
      (recipient) =>
        new Recipient(
          recipient.id,
          recipient.name,
          recipient.surname,
          recipient.email,
          recipient.phoneNumber,
          recipient.password,
          recipient.address,
        ),
    );
  }

  save(recipient: Recipient): Promise<Recipient> {
    return Promise.resolve(undefined);
  }

  getOne(id: string): Promise<Recipient> {
    return Promise.resolve(undefined);
  }
}
