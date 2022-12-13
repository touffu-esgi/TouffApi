import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddPositionDto {
  @IsNotEmpty()
  agreementRef: string;

  @IsNotEmpty()
  @IsNumber()
  xCoordinate: number;

  @IsNotEmpty()
  @IsNumber()
  yCoordinate: number;
}
