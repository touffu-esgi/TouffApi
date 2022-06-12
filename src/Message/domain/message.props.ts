export interface MessageProps {
  readonly id: string;
  readonly content: string;
  readonly dateSent: Date;
  readonly senderId: string;
  readonly recipientId: string;
}
