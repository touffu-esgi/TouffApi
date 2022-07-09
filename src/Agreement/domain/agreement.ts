import { AgreementProps } from './agreement.props';
import { AgreementRecurrenceEnum } from './agreement.recurrence.enum';

export class Agreement implements AgreementProps {
  private readonly _id: string;
  private readonly _recurring: boolean;
  private readonly _providerRef: string;
  private readonly _recipientRef: string;
  private readonly _animalsRefs: string[];
  private readonly _beginningDate: Date;
  private readonly _endDate?: Date;
  private readonly _recurrence?: AgreementRecurrenceEnum;
  private readonly _duration: number;
  private readonly _remuneration?: number;
  private readonly _status: string;

  constructor(agreementProps: AgreementProps) {
    this._id = agreementProps.id;
    this._recurring = agreementProps.recurring;
    this._providerRef = agreementProps.providerRef;
    this._recipientRef = agreementProps.recipientRef;
    this._animalsRefs = agreementProps.animalsRefs;
    this._beginningDate = agreementProps.beginningDate;
    this._endDate = agreementProps.endDate;
    this._recurrence = agreementProps.recurrence;
    this._duration = agreementProps.duration;
    this._remuneration = agreementProps.remuneration;
    this._status = agreementProps.status;
  }

  get id(): string {
    return this._id;
  }

  get recurring(): boolean {
    return this._recurring;
  }

  get providerRef(): string {
    return this._providerRef;
  }

  get recipientRef(): string {
    return this._recipientRef;
  }

  get animalsRefs(): string[] {
    return this._animalsRefs;
  }

  get beginningDate(): Date {
    return this._beginningDate;
  }

  get endDate(): Date {
    return this._endDate;
  }

  get recurrence(): AgreementRecurrenceEnum {
    return this._recurrence;
  }

  get duration(): number {
    return this._duration;
  }

  get status(): string {
    return this._status;
  }

  get remuneration(): number {
    return this._remuneration;
  }
}
