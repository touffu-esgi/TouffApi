import { MessageRepository } from '../domain/message.repository';
import { Message } from '../domain/message';

export class MessageRepositoryInMemory implements MessageRepository {
  private readonly messages: Message[] = [
    new Message({
      id: '1',
      content: 'Hello toi',
      dateSent: new Date(),
      senderId: '1',
      recipientId: '2',
    }),
    new Message({
      id: '2',
      content: 'Bonjour cher touriste',
      dateSent: new Date(),
      senderId: '2',
      recipientId: '1',
    }),
  ];

  async getConversation(
    userOneId: string,
    userTwoId: string,
  ): Promise<Message[]> {
    const conversationMsgs = this.messages.filter(
      (msg) =>
        (msg.senderId === userOneId || msg.recipientId === userOneId) &&
        (msg.recipientId === userTwoId || msg.senderId === userTwoId),
    );
    if (conversationMsgs) return conversationMsgs;
    throw new Error('Conversation not found');
  }

  async save(msg: Message): Promise<Message> {
    this.messages.push(msg);
    return msg;
  }

  getNextId(): string {
    return (+this.messages.at(-1).id + 1).toString();
  }
}
