import { Message } from './message';

export interface MessageRepository {
  getConversation(senderId: string, recipientId: string): Promise<Message[]>;
  save(msg: Message): Promise<Message>;
}
