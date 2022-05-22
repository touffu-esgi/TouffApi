import { IsNotEmpty, MaxLength } from 'class-validator';

export class AddAnimalDto {
  @IsNotEmpty()
  @MaxLength(1)
  name: string;
}
