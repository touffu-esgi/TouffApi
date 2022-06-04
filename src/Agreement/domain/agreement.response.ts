import { AgreementProps } from './agreement.props';

export class AgreementResponse {
  id: string;
  recurring: boolean;
  providerRef: string;
  recipientRef: string;
  animalsRefs: string[];
  beginningDate: Date;
  endDate: Date;
  calendarRef: string;
  recurrence?: string;

  constructor(agreementProps: AgreementProps) {
    this.id = agreementProps.id;
    this.recurring = agreementProps.recurring;
    this.providerRef = agreementProps.providerRef;
    this.recipientRef = agreementProps.recipientRef;
    this.animalsRefs = agreementProps.animalsRefs;
    this.calendarRef = agreementProps.calendarRef;
    this.beginningDate = agreementProps.beginningDate;
    this.endDate = agreementProps.endDate;
    this.recurrence = agreementProps.recurrence.toString();
  }
}
