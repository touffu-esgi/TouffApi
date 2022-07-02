export interface BillProps {
  readonly id: string;
  readonly onePaymentValue: number;
  readonly total: number;
  readonly agreementRef: string;
  readonly providerRef: string;
  readonly recipientRef: string;
  readonly datesAgreement: Date[];
  readonly dateBill: Date;
  readonly datePaid?: Date;
}
