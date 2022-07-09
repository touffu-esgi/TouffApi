import { Injectable } from '@nestjs/common';
import { BillRepositoryInMemory } from '../persistence/bill.repository.in-memory';
import { Bill } from '../domain/bill';
import { AddBillDto } from '../dto/add-bill.dto';
import { AgreementRepositoryInMemory } from '../../Agreement/persistence/agreement.repository.in-memory';
import { Agreement } from '../../Agreement/domain/agreement';
import { dateIsBetweenBounds } from '../../shared/utils/date-time.utils';
import { AddAllBillsDto } from '../dto/add-all-bills.dto';
import { UpdateBillDto } from '../dto/update-bill.dto';
import { BillNotFoundException } from './exceptions/bill-not-found.exception';

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
      agreementRef: agreement.id,
      recipientRef: agreement.recipientRef,
      providerRef: agreement.providerRef,
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
        dateIsBetweenBounds(
          curDate,
          agreement.beginningDate,
          agreement.endDate,
        ) &&
        (await this.agreementRepository.dayMatchesAgreement(agreement, curDate))
      ) {
        dates.push(new Date(curDate));
      }
      curDate = new Date(curDate.setDate(curDate.getDate() + 1));
    }
    return dates;
  }

  async addAll(dto: AddAllBillsDto): Promise<Bill[]> {
    const bills: Bill[] = [];
    const agreements = await this.agreementRepository.getAll({
      status: 'Agreed',
    });
    for (const agreement of agreements) {
      const addBillDto: AddBillDto = {
        agreementId: agreement.id,
        dateFrom: dto.dateFrom,
        dateTo: dto.dateTo,
      };
      bills.push(await this.add(addBillDto));
    }
    return bills;
  }

  async getAll(filters: any): Promise<Bill[]> {
    let bills = await this.billRepository.getAll();
    if (filters) {
      Object.keys(filters).forEach((propName) => {
        bills = bills.filter(
          (bill) => !bill[propName] || bill[propName] === filters[propName],
        );
      });
    }
    if (bills.length == 0) {
      throw new BillNotFoundException();
    }
    return bills;
  }

  async updateOne(dto: UpdateBillDto) {
    const id = dto.billId;
    this.billRepository.updateOne(id);
  }
}
