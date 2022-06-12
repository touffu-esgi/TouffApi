import { MessageRepositoryInMemory } from '../persistance/message.repository.in-memory';
import { Message } from '../domain/message';
import { Injectable } from '@nestjs/common';
import { AddMessageDto } from '../dto/add-message.dto';

@Injectable()
export class MessageService {
  constructor(private msgRepository: MessageRepositoryInMemory) {}

  async getConversation(
    userOneId: string,
    userTwoId: string,
  ): Promise<Message[]> {
    return await this.msgRepository.getConversation(userOneId, userTwoId);
  }

  async getUserConversations(userId: string): Promise<any> {
    return await this.msgRepository.getUserConversations(userId);
  }

  async sendMessage(dto: AddMessageDto): Promise<Message> {
    const nextId = this.msgRepository.getNextId();
    const newMsg = new Message({
      id: nextId,
      content: dto.content,
      dateSent: new Date(),
      senderId: dto.senderId,
      recipientId: dto.recipientId,
    });
    return await this.msgRepository.save(newMsg);
  }
}
