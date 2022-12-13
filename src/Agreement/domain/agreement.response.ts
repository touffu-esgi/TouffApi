import { AgreementProps } from './agreement.props';

export class AgreementResponse {
  id: string;
  recurring: boolean;
  providerRef: string;
  recipientRef: string;
  animals: string[];
  beginningDate: Date;
  endDate: Date;
  recurrence?: string;
  duration: number;
  remuneration: number;
  status: string;

  constructor(agreementProps: AgreementProps) {
    this.id = agreementProps.id;
    this.recurring = agreementProps.recurring;
    this.providerRef = agreementProps.providerRef;
    this.recipientRef = agreementProps.recipientRef;
    this.animals = agreementProps.animalsRefs;
    this.beginningDate = agreementProps.beginningDate;
    this.endDate = agreementProps.endDate;
    this.recurrence = agreementProps.recurrence.toString();
    this.duration = agreementProps.duration;
    this.remuneration = agreementProps.remuneration;
    this.status = agreementProps.status;
  }
}
