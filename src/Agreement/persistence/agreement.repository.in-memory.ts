import { AgreementRepository } from '../domain/agreement.repository';
import { Agreement } from '../domain/agreement';
import { AgreementRecurrenceEnum } from '../domain/agreement.recurrence.enum';
import { AgreementNotFoundException } from '../application/exceptions/agreement-not-found.exception';
import {
  getWeekdayFromInt,
  IntWeekDays,
} from '../../Availability/domain/weekdays';

export class AgreementRepositoryInMemory implements AgreementRepository {
  private readonly agreements = [
    new Agreement({
      id: '1',
      recurring: true,
      recurrence: AgreementRecurrenceEnum.Weekly,
      providerRef: '1',
      recipientRef: '1',
      animalsRefs: ['1', '2'],
      beginningDate: new Date(2022, 5, 6, 12, 30),
      endDate: new Date(2022, 12, 6, 14, 30),
      duration: 1,
      remuneration: 25.5,
    }),
    new Agreement({
      id: '2',
      recurring: false,
      providerRef: '2',
      recipientRef: '1',
      animalsRefs: ['3'],
      beginningDate: new Date(2022, 6, 1, 13, 23),
      endDate: new Date(2022, 6, 1, 13, 23),
      duration: 2,
      remuneration: 130.0,
    }),
  ];

  async getAll(filters: unknown): Promise<Agreement[]> {
    let agreements = this.agreements;
    if (filters) {
      Object.keys(filters).forEach((propName) => {
        agreements = agreements.filter(
          (agreement) =>
            !agreement[propName] || agreement[propName] === filters[propName],
        );
      });
    }
    return agreements;
  }

  async getOne(agreementId: string): Promise<Agreement> {
    const agreements = this.agreements.filter(
      (agreement) => agreement.id === agreementId,
    );
    if (agreements.length > 0) return agreements[0];
    throw new AgreementNotFoundException(`Agreement ${agreementId} not found`);
  }

  async add(agreement: Agreement): Promise<Agreement> {
    this.agreements.push(agreement);
    return agreement;
  }

  getNextId(): string {
    return (+this.agreements.at(-1).id + 1).toString();
  }

  async dayMatchesAgreement(agreementId: string, day: Date): Promise<boolean> {
    const agreement = await this.getOne(agreementId);
    if (agreement.beginningDate > day || agreement.endDate < day) return false;
    switch (agreement.recurrence.toString()) {
      case AgreementRecurrenceEnum.Daily:
        return true;
      case AgreementRecurrenceEnum.Weekly:
        if (agreement.beginningDate.getDay() === day.getDay()) {
          return true;
        }
        break;
      case AgreementRecurrenceEnum.Monthly:
        if (day.getDate() === agreement.beginningDate.getDate()) return true;
    }
    return false;
  }
}
