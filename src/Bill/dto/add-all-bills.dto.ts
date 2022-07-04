import { IsNotEmpty } from 'class-validator';

export class AddAllBillsDto {
  @IsNotEmpty()
  dateFrom: string;

  @IsNotEmpty()
  dateTo: string;
}
