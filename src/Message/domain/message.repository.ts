import { Message } from './message';

export interface MessageRepository {
  getConversation(senderId: string, recipientId: string): Promise<Message[]>;
  getUserConversations(userId: string);
  save(msg: Message): Promise<Message>;
}
