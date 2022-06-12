import { IsNotEmpty } from 'class-validator';

export class GetMessageDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  dateSent: Date;

  @IsNotEmpty()
  senderId: string;

  @IsNotEmpty()
  recipientId: string;
}
