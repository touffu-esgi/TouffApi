import { AgreementRecurrenceEnum } from './agreement.recurrence.enum';

export interface AgreementProps {
  id: string;
  recurring: boolean;
  recurrence?: AgreementRecurrenceEnum;
  providerRef: string;
  recipientRef: string;
  animalsRefs: string[];
  beginningDate: Date;
  endDate: Date;
  duration: number;
  remuneration: number;
  status: string;
}
