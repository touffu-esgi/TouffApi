import { IsNotEmpty } from 'class-validator';

export class UpdateBillDto {
  @IsNotEmpty()
  billId: string;
}
