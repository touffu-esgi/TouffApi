import { MessageRepositoryInMemory } from '../persistance/message.repository.in-memory';
import { Message } from '../domain/message';
import { Injectable } from '@nestjs/common';
import { AddMessageDto } from '../dto/add-message.dto';
import { UserRepositoryInMemory } from '../../Users/persistence/user.repository.in-memory';
import { ProviderRepositoryInMemory } from '../../Providers/persistence/provider.repository.in-memory';
import { RecipientRepositoryInMemory } from '../../Recipients/persistence/recipient.repository.in-memory';

@Injectable()
export class MessageService {
  constructor(
    private msgRepository: MessageRepositoryInMemory,
    private userRepository: UserRepositoryInMemory,
    private providerRepository: ProviderRepositoryInMemory,
    private recipientRepository: RecipientRepositoryInMemory,
  ) {}

  async getConversation(
    userOneId: string,
    userTwoId: string,
  ): Promise<Message[]> {
    return await this.msgRepository.getConversation(userOneId, userTwoId);
  }

  async getUserConversations(userId: string): Promise<any> {
    const conversations = await this.msgRepository.getUserConversations(userId);
    for (const recipientId of Object.keys(conversations)) {
      const user = await this.userRepository.getOne(recipientId);
      if (user.userType === 'provider') {
        const sender = await this.providerRepository.getOne(user.userReference);
        conversations[recipientId].senderName = sender.name;
      }
      if (user.userType === 'recipient') {
        const sender = await this.recipientRepository.getOne(
          user.userReference,
        );
        conversations[recipientId].senderName = sender.name;
      }
    }
    return conversations;
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
