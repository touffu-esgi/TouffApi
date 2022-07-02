import { Bill } from '../domain/bill';
import { BillResponse } from '../domain/bill.response';

export class BillAdapter {
  public static toBillResponse(dto: Bill): BillResponse {
    throw new Error('Not implemented');
  }
}
