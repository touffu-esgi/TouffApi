import { Message } from '../domain/message';
import { MessageResponse } from '../domain/message.response';

export class MessageAdapter {
  public static toMessageResponse(dto: Message, baseUrl: string) {
    return new MessageResponse({
      id: dto.id,
      content: dto.content,
      dateSent: dto.dateSent,
      senderId: `${baseUrl}/user/${dto.senderId}`,
      recipientId: `${baseUrl}/user/${dto.recipientId}`,
    });
  }

  public static toConversationList(dto: any, userId: string, baseUrl: string) {
    const conversationList = [];
    Object.keys(dto).forEach((recipientId) => {
      conversationList.push({
        conversation: `${baseUrl}/message/${userId}/${recipientId}`,
        lastMessage: dto[recipientId].content,
      });
    });
    return conversationList;
  }
}
