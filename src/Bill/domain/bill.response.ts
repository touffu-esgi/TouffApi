import { BillProps } from './bill.props';
import { Bill } from './bill';
export class BillResponse implements BillProps {
  readonly id: string;
  readonly onePaymentValue: number;
  readonly total: number;
  readonly agreementRef: string;
  readonly providerRef: string;
  readonly recipientRef: string;
  readonly datesAgreement: Date[];
  readonly dateBill: Date;
  readonly datePaid: Date;

  constructor(billProps: BillProps) {
    this.id = billProps.id;
    this.onePaymentValue = billProps.onePaymentValue;
    this.total = billProps.total;
    this.agreementRef = billProps.agreementRef;
    this.providerRef = billProps.providerRef;
    this.recipientRef = billProps.recipientRef;
    this.datesAgreement = billProps.datesAgreement;
    this.dateBill = billProps.dateBill;
    this.datePaid = billProps.datePaid ? billProps.datePaid : null;
  }
}
