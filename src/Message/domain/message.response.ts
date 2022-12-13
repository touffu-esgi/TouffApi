import { MessageProps } from './message.props';

export class MessageResponse {
  readonly id: string;
  readonly content: string;
  readonly dateSent: Date;
  readonly senderId: string;
  readonly recipientId: string;

  constructor(msgProps: MessageProps) {
    this.id = msgProps.id;
    this.content = msgProps.content;
    this.dateSent = msgProps.dateSent;
    this.senderId = msgProps.senderId;
    this.recipientId = msgProps.recipientId;
  }
}
