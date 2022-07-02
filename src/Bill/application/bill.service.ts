import { Injectable } from '@nestjs/common';
import { BillRepositoryInMemory } from '../persistence/bill.repository.in-memory';
import { Bill } from '../domain/bill';
import { AddBillDto } from '../dto/add-bill.dto';
import { AgreementRepositoryInMemory } from '../../Agreement/persistence/agreement.repository.in-memory';
import { Agreement } from '../../Agreement/domain/agreement';

@Injectable()
export class BillService {
  constructor(
    private billRepository: BillRepositoryInMemory,
    private agreementRepository: AgreementRepositoryInMemory,
  ) {}

  async add(dto: AddBillDto): Promise<Bill> {
    const newId = await this.billRepository.getNextId();
    const agreement = await this.agreementRepository.getOne(dto.agreementId);
    const dateFrom = new Date(dto.dateFrom);
    const dateTo = new Date(dto.dateTo);
    const datesDone = await this.getDatesAgreement(dateFrom, dateTo, agreement);
    const bill = new Bill({
      id: newId,
      onePaymentValue: agreement.remuneration,
      datesAgreement: datesDone,
      total: this.computeTotal(agreement.remuneration, datesDone.length),
      agreementId: agreement.id,
      recipientId: agreement.recipientRef,
      providerId: agreement.providerRef,
      dateBill: new Date(),
    });
    return await this.billRepository.add(bill);
  }

  computeTotal(uniqueValue: number, numberServices: number) {
    return uniqueValue * numberServices;
  }

  async getDatesAgreement(
    dateFrom: Date,
    dateTo: Date,
    agreement: Agreement,
  ): Promise<Date[]> {
    const dates: Date[] = [];
    let curDate = new Date(dateFrom);
    while (curDate < dateTo) {
      if (
        await this.agreementRepository.dayMatchesAgreement(agreement, curDate)
      ) {
        dates.push(curDate);
      }
      curDate = new Date(curDate.setDate(curDate.getDate() + 1));
    }
    return dates;
  }
}
