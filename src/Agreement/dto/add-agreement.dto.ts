import { IsDate, IsNotEmpty, IsPositive } from 'class-validator';
import { AgreementRecurrenceEnum } from '../domain/agreement.recurrence.enum';

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
  // @IsDate()
  beginningDate: string;

  @IsNotEmpty()
  //@IsDate()
  endDate: string;

  @IsNotEmpty()
  @IsPositive()
  duration: number;

  @IsNotEmpty()
  @IsPositive()
  remuneration: number;
}
