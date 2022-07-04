import { BillProps } from './bill.props';
export class Bill implements BillProps {
  private readonly _id: string;
  private readonly _onePaymentValue: number;
  private readonly _total: number;
  private readonly _agreementRef: string;
  private readonly _providerRef: string;
  private readonly _recipientRef: string;
  private readonly _datesAgreement: Date[];
  private readonly _dateBill: Date;
  _datePaid?: Date;

  constructor(billProps: BillProps) {
    this._id = billProps.id;
    this._onePaymentValue = billProps.onePaymentValue;
    this._total = billProps.total;
    this._agreementRef = billProps.agreementRef;
    this._providerRef = billProps.providerRef;
    this._recipientRef = billProps.recipientRef;
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

  get agreementRef(): string {
    return this._agreementRef;
  }

  get providerRef(): string {
    return this._providerRef;
  }

  get recipientRef(): string {
    return this._recipientRef;
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
