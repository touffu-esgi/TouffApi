import { IsNotEmpty } from 'class-validator';

export class AddMessageDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  senderId: string;

  @IsNotEmpty()
  recipientId: string;
}
