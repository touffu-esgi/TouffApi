import { Module } from '@nestjs/common';
import { RecipientsController } from './exposition/controller/recipients.controller';
import { RecipientsService } from './application/recipient.service';
import { RecipientRepositoryInMemory } from './persistence/recipient.repository.in-memory';
import { RecipientRepositoryMongoose } from './persistence/mongoose-recipient-repository/recipient.repository.mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../Users/persistence/mongo-user-repository/user.schema';
import { RecipientSchema } from './persistence/mongoose-recipient-repository/recipient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Recipients', schema: RecipientSchema },
    ]),
  ],
  controllers: [RecipientsController],
  providers: [RecipientsService, RecipientRepositoryMongoose],
})
export class RecipientsModule {}
