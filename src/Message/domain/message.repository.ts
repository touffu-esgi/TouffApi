export interface MessageRepository {
  getConversation(senderId: string, recipientId: string);
}
