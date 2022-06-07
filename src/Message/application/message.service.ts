import { MessageRepositoryInMemory } from '../persistance/message.repository.in-memory';
import { Message } from '../domain/message';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  constructor(private msgRepository: MessageRepositoryInMemory) {}

  async getConversation(
    userOneId: string,
    userTwoId: string,
  ): Promise<Message[]> {
    return this.msgRepository.getConversation(userOneId, userTwoId);
  }
}
