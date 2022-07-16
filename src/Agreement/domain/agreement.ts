import { AgreementProps } from './agreement.props';
import { AgreementRecurrenceEnum } from './agreement.recurrence.enum';

export class Agreement implements AgreementProps {
  id: string;
  recurring: boolean;
  providerRef: string;
  recipientRef: string;
  animalsRefs: string[];
  beginningDate: Date;
  endDate: Date;
  recurrence?: AgreementRecurrenceEnum;
  duration: number;
  remuneration: number;
  status: string;

  constructor(agreementProps: AgreementProps) {
    this.id = agreementProps.id;
    this.recurring = agreementProps.recurring;
    this.providerRef = agreementProps.providerRef;
    this.recipientRef = agreementProps.recipientRef;
    this.animalsRefs = agreementProps.animalsRefs;
    this.beginningDate = agreementProps.beginningDate;
    this.endDate = agreementProps.endDate;
    this.recurrence = agreementProps.recurrence;
    this.duration = agreementProps.duration;
    this.remuneration = agreementProps.remuneration;
    this.status = agreementProps.status;
  }
}
