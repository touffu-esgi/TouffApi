import { RecipientRepository } from '../../domain/recipient.repository';
import { Recipient } from '../../domain/recipient';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecipientDocument, RecipientProps } from './recipient.schema';

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

  async save(recipient: RecipientProps): Promise<Recipient> {
    const newRecipient: RecipientDocument = await this.recipientModel.create(
      recipient,
    );
    return new Recipient(
      newRecipient._id,
      newRecipient.name,
      newRecipient.surname,
      newRecipient.email,
      newRecipient.phoneNumber,
      newRecipient.password,
      newRecipient.address,
    );
  }

  async getOne(recipientId: string): Promise<Recipient> {
    const recipient: RecipientDocument = await this.recipientModel.findById(
      recipientId,
    );
    return new Recipient(
      recipient._id,
      recipient.name,
      recipient.surname,
      recipient.email,
      recipient.phoneNumber,
      recipient.password,
      recipient.address,
    );
  }
}
