import { Bill } from '../domain/bill';
import { BillResponse } from '../domain/bill.response';

export class BillAdapter {
  public static toBillResponse(dto: Bill): BillResponse {
    return new BillResponse({
      id: dto.id,
      onePaymentValue: dto.onePaymentValue,
      total: dto.total,
      agreementRef: dto.agreementRef,
      providerRef: dto.providerRef,
      recipientRef: dto.recipientRef,
      datesAgreement: dto.datesAgreement,
      dateBill: dto.dateBill,
      datePaid: dto.datePaid,
    });
  }
}
