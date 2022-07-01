import { IsNotEmpty, IsPositive } from 'class-validator';

export class AddAgreementDto {
  @IsNotEmpty()
  recurring: boolean;

  recurrence: string;

  @IsNotEmpty()
  providerRef: string;

  @IsNotEmpty()
  recipientRef: string;

  @IsNotEmpty()
  animalsRefs: string[];

  @IsNotEmpty()
  beginningDate: string;

  endDate: string;

  @IsNotEmpty()
  @IsPositive()
  duration: number;

  @IsNotEmpty()
  @IsPositive()
  remuneration: number;
}
