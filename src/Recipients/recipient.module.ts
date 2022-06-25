import { Module } from '@nestjs/common';
import { RecipientsController } from './exposition/controller/recipients.controller';
import { RecipientsService } from './application/recipient.service';
import { RecipientRepositoryInMemory } from './persistence/recipient.repository.in-memory';
import { UserRepositoryInMemory } from '../Users/persistence/user.repository.in-memory';

@Module({
  controllers: [RecipientsController],
  providers: [
    RecipientsService,
    RecipientRepositoryInMemory,
    UserRepositoryInMemory,
  ],
})
export class RecipientsModule {}
