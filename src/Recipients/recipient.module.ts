import { Module } from '@nestjs/common';
import { RecipientsController } from './exposition/controller/recipients.controller';
import { RecipientsService } from './application/recipient.service';
import { RecipientRepositoryInMemory } from './persistence/recipient.repository.in-memory';
import { UserRepositoryInMemory } from '../Users/persistence/user.repository.in-memory';
import { UserModule } from '../Users/user.module';

@Module({
  controllers: [RecipientsController],
  exports: [RecipientRepositoryInMemory],
  imports: [UserModule],
  providers: [RecipientsService, RecipientRepositoryInMemory],
})
export class RecipientsModule {}
