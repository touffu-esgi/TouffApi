import { IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateAgreementDto {
  @IsNotEmpty()
  id: string;

  recurring?: boolean;

  recurrence?: string;

  beginningDate?: Date;

  endDate?: Date;

  duration?: number;

  remuneration?: number;

  status?: string;

  animals?: [string];

  providerRef?: string;

  recipientRef?: string;
}
