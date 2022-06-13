import { Module } from '@nestjs/common';
import { MessageController } from './exposition/controller/message.controller';
import { MessageService } from './application/message.service';
import { MessageRepositoryInMemory } from './persistance/message.repository.in-memory';
import { UserRepositoryInMemory } from '../Users/persistence/user.repository.in-memory';
import { ProviderRepositoryInMemory } from '../Providers/persistence/provider.repository.in-memory';
import { RecipientRepositoryInMemory } from '../Recipients/persistence/recipient.repository.in-memory';

@Module({
  controllers: [MessageController],
  providers: [
    MessageService,
    MessageRepositoryInMemory,
    UserRepositoryInMemory,
    ProviderRepositoryInMemory,
    RecipientRepositoryInMemory,
  ],
})
export class MessageModule {}
