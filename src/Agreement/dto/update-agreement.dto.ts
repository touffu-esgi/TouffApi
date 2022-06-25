import { IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateAgreementDto {
  @IsNotEmpty()
  _id: string;

  recurring?: boolean;

  recurrence?: string;

  beginningDate?: Date;

  endDate?: Date;

  duration?: number;

  remuneration?: number;

  status?: string;
}
