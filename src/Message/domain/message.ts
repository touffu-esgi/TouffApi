import { MessageProps } from './message.props';

export class Message implements MessageProps {
  private readonly _id: string;
  private readonly _content: string;
  private readonly _dateSent: Date;
  private readonly _senderId: string;
  private readonly _recipientId: string;

  constructor(msgProps: MessageProps) {
    this._id = msgProps.id;
    this._content = msgProps.content;
    this._dateSent = msgProps.dateSent;
    this._senderId = msgProps.senderId;
    this._recipientId = msgProps.recipientId;
  }

  get id(): string {
    return this._id;
  }

  get content(): string {
    return this._content;
  }

  get dateSent(): Date {
    return this._dateSent;
  }

  get senderId(): string {
    return this._senderId;
  }

  get recipientId(): string {
    return this._recipientId;
  }
}
