import { Module } from '@nestjs/common';
import { MessageController } from './exposition/controller/message.controller';
import { MessageService } from './application/message.service';
import { MessageRepositoryInMemory } from './persistance/message.repository.in-memory';
import { UserRepositoryInMemory } from '../Users/persistence/user.repository.in-memory';
import { ProviderRepositoryInMemory } from '../Providers/persistence/provider.repository.in-memory';
import { RecipientRepositoryInMemory } from '../Recipients/persistence/recipient.repository.in-memory';
import { ProviderModule } from '../Providers/provider.module';
import { RecipientsModule } from '../Recipients/recipient.module';
import { UserModule } from '../Users/user.module';

@Module({
  controllers: [MessageController],
  imports: [ProviderModule, RecipientsModule, UserModule],
  providers: [MessageService, MessageRepositoryInMemory],
})
export class MessageModule {}
