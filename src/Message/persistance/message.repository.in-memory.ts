import { MessageRepository } from '../domain/message.repository';
import { Message } from '../domain/message';
import { ConversationNotFoundException } from '../application/exceptions/conversation-not-found.exception';
import { MessageResponse } from '../domain/message.response';
import { NoConversationsException } from '../application/exceptions/no-conversations.exception';

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
    if (conversationMsgs.length > 0) return conversationMsgs;
    throw new ConversationNotFoundException(`Conversation not found`);
  }

  async getUserConversations(userId: string): Promise<any> {
    const conversationMsgs = this.messages.filter(
      (msg) => msg.senderId === userId || msg.recipientId === userId,
    );
    if (conversationMsgs.length === 0) throw new NoConversationsException();
    const msgCombinations = {};
    conversationMsgs.forEach(function (msg) {
      const maxLength = msg.content.length > 60 ? 60 : msg.content.length;
      const recipient =
        msg.recipientId === userId ? msg.senderId : msg.recipientId;
      msgCombinations[recipient] = {
        content: msg.content.substring(0, maxLength),
      };
    });
    return msgCombinations;
  }

  async save(msg: Message): Promise<Message> {
    this.messages.push(msg);
    return msg;
  }

  getNextId(): string {
    return (+this.messages.at(-1).id + 1).toString();
  }
}
