import { Module } from '@nestjs/common';
import { MessageController } from './exposition/controller/message.controller';
import { MessageService } from './application/message.service';
import { MessageRepositoryInMemory } from './persistance/message.repository.in-memory';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageRepositoryInMemory],
})
export class MessageModule {}
