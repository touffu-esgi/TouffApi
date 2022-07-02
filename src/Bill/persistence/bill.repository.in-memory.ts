import { Bill } from '../domain/bill';
import { BillRepository } from '../domain/bill.repository';

export class BillRepositoryInMemory implements BillRepository {
  private bills: Bill[] = [
    new Bill({
      id: '1',
      onePaymentValue: 37.5,
      total: 148,
      agreementId: '1',
      providerId: '1',
      recipientId: '1',
      datesAgreement: [
        new Date('2022-06-06'),
        new Date('2022-06-13'),
        new Date('2022-06-20'),
        new Date('2022-06-27'),
      ],
      dateBill: new Date('2022-07-01'),
    }),
  ];

  async add(bill: Bill): Promise<Bill> {
    this.bills.push(bill);
    return bill;
  }

  async getNextId(): Promise<string> {
    return (+this.bills.at(-1).id + 1).toString();
  }
}
