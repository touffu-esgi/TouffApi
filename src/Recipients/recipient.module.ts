import { Module } from '@nestjs/common';
import { RecipientsController } from './exposition/controller/recipients.controller';
import { RecipientsService } from './application/recipient.service';
import { RecipientRepositoryInMemory } from './persistence/recipient.repository.in-memory';

@Module({
  controllers: [RecipientsController],
  providers: [RecipientsService, RecipientRepositoryInMemory],
})
export class RecipientsModule {}
