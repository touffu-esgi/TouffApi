import { BillProps } from './bill.props';
export class BillResponse implements BillProps {
  readonly id: string;
  readonly onePaymentValue: number;
  readonly total: number;
  readonly agreementId: string;
  readonly providerId: string;
  readonly recipientId: string;
  readonly datesAgreement: Date[];
  readonly dateBill: Date;
  readonly datePaid: Date;
}
