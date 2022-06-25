import { IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateAgreementDto {
  @IsNotEmpty()
  _id: string;

  recurring?: boolean;

  recurrence?: string;

  providerRef?: string;

  recipientRef?: string;

  animalsRefs?: string[];

  beginningDate?: string;

  endDate?: string;

  @IsPositive()
  duration?: number;

  @IsPositive()
  remuneration?: number;
}
