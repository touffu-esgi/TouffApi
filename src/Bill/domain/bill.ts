import { BillProps } from './bill.props';
export class Bill implements BillProps {
  private readonly _id: string;
  private readonly _onePaymentValue: number;
  private readonly _total: number;
  private readonly _agreementId: string;
  private readonly _providerId: string;
  private readonly _recipientId: string;
  private readonly _datesAgreement: Date[];
  private readonly _dateBill: Date;
  private readonly _datePaid?: Date;

  constructor(billProps: BillProps) {
    this._id = billProps.id;
    this._onePaymentValue = billProps.onePaymentValue;
    this._total = billProps.total;
    this._agreementId = billProps.agreementId;
    this._providerId = billProps.providerId;
    this._recipientId = billProps.recipientId;
    this._datesAgreement = billProps.datesAgreement;
    this._dateBill = billProps.dateBill;
    this._datePaid = billProps.datePaid ? billProps.datePaid : null;
  }

  get id(): string {
    return this._id;
  }

  get onePaymentValue(): number {
    return this._onePaymentValue;
  }

  get total(): number {
    return this._total;
  }

  get agreementId(): string {
    return this._agreementId;
  }

  get providerId(): string {
    return this._providerId;
  }

  get recipientId(): string {
    return this._recipientId;
  }

  get datesAgreement(): Date[] {
    return this._datesAgreement;
  }

  get dateBill(): Date {
    return this._dateBill;
  }

  get datePaid(): Date {
    return this._datePaid;
  }
}
