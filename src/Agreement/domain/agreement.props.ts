import { AgreementRecurrenceEnum } from './agreement.recurrence.enum';

export interface AgreementProps {
  readonly id: string;
  readonly recurring: boolean;
  readonly recurrence?: AgreementRecurrenceEnum;
  readonly providerRef: string;
  readonly recipientRef: string;
  readonly animalsRefs: string[];
  readonly beginningDate: Date;
  readonly endDate: Date;
  readonly duration: number;
  readonly remuneration: number;
  readonly status: string;
}
