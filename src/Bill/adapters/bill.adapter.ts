import { Bill } from '../domain/bill';
import { BillResponse } from '../domain/bill.response';
import { ControllerEndpointsUtils } from '../../shared/utils/controller.endpoints.utils';

export class BillAdapter {
  public static toBillResponse(dto: Bill, baseUrl: string): BillResponse {
    return new BillResponse({
      id: dto.id,
      onePaymentValue: dto.onePaymentValue,
      total: dto.total,
      agreementRef: dto.agreementRef,
      providerRef: `${baseUrl}/${ControllerEndpointsUtils.getEndpoint(
        'providers',
      )}/${dto.providerRef}`,
      recipientRef: `${baseUrl}/${ControllerEndpointsUtils.getEndpoint(
        'recipient',
      )}/${dto.providerRef}`,
      datesAgreement: dto.datesAgreement,
      dateBill: dto.dateBill,
      datePaid: dto.datePaid,
    });
  }
}
