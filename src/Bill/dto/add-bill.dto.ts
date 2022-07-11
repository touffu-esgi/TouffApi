import { IsNotEmpty } from 'class-validator';

export class AddBillDto {
  @IsNotEmpty()
  agreementId: string;

  @IsNotEmpty()
  dateFrom: string;

  @IsNotEmpty()
  dateTo: string;
}
