import { IsNotEmpty } from 'class-validator';

export class AddAnimalDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  recipientId: string;
}
