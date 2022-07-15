import { AgreementRepository } from '../domain/agreement.repository';
import { Agreement } from '../domain/agreement';
import { AgreementRecurrenceEnum } from '../domain/agreement.recurrence.enum';
import { AgreementNotFoundException } from '../application/exceptions/agreement-not-found.exception';
import { UpdateAgreementDto } from '../dto/update-agreement.dto';
import { NoCurrentAgreementException } from '../application/exceptions/no-current-agreement.exception';
import {
  dateIsBetweenBounds,
  getDate,
  timeIsInPeriod,
} from '../../shared/utils/date-time.utils';

export class AgreementRepositoryInMemory implements AgreementRepository {
  //status types : 'InDiscussion', 'Agreed', 'Canceled'
  private readonly agreements = [
    new Agreement({
      id: '1',
      recurring: true,
      recurrence: AgreementRecurrenceEnum.Daily,
      providerRef: '1',
      recipientRef: '1',
      animalsRefs: ['1', '2'],
      beginningDate: new Date('2022-05-06T08:30'),
      endDate: new Date('2022-12-06T23:59'),
      duration: 4,
      remuneration: 25.5,
      status: 'InDiscussion',
    }),
    new Agreement({
      id: '2',
      recurring: false,
      providerRef: '2',
      recipientRef: '1',
      animalsRefs: ['3'],
      beginningDate: new Date('2022-05-06T13:23'),
      endDate: new Date('2022-05-06T23:59'),
      duration: 2,
      remuneration: 130.0,
      status: 'Agreed',
    }),
    new Agreement({
      id: '3',
      recurring: true,
      recurrence: AgreementRecurrenceEnum.Daily,
      providerRef: '1',
      recipientRef: '1',
      animalsRefs: ['1', '2'],
      beginningDate: new Date('2022-12-07T20:00'),
      endDate: new Date('2022-12-11T23:59'),
      duration: 12,
      remuneration: 25.5,
      status: 'Agreed',
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

  async dayMatchesAgreement(agreement: Agreement, day: Date): Promise<boolean> {
    if (agreement.status !== 'Agreed') return false;
    if (getDate(agreement.beginningDate) > day || agreement.endDate < day)
      return false;
    switch (agreement.recurrence) {
      case AgreementRecurrenceEnum.Daily:
        return true;
      case AgreementRecurrenceEnum.Weekly:
        if (agreement.beginningDate.getDay() === day.getDay()) {
          return true;
        }
        break;
      case AgreementRecurrenceEnum.Monthly:
        if (day.getDate() === agreement.beginningDate.getDate()) return true;
        break;
      default:
        return true;
    }
    return false;
  }

  async getOneFromAnimalAndDatetime(
    dt: Date,
    animalId: string,
  ): Promise<Agreement> {
    const agreementsMatchingDay = [];

    for (const agreement of this.agreements) {
      if (await this.dayMatchesAgreement(agreement, dt)) {
        agreementsMatchingDay.push(agreement.id);
      }
    }

    const agreements = this.agreements.filter((agreement) => {
      const dateIsInAgreementBounds = dateIsBetweenBounds(
        dt,
        agreement.beginningDate,
        agreement.endDate,
      );
      const isAgreed = agreement.status === 'Agreed';
      const animalIsInAgreement =
        agreement.animalsRefs.indexOf(animalId) !== -1;
      const timeIsOnAgreementPeriod = timeIsInPeriod(
        dt,
        agreement.beginningDate,
        agreement.duration,
      );
      const dayIsInReccurence =
        agreementsMatchingDay.indexOf(agreement.id) !== -1;
      return (
        isAgreed &&
        animalIsInAgreement &&
        dateIsInAgreementBounds &&
        timeIsOnAgreementPeriod &&
        dayIsInReccurence
      );
    });
    if (agreements.length > 0) return agreements[0];
    throw new NoCurrentAgreementException(
      `No current agreement on ${dt} for animal ${animalId}`,
    );
  }

  update(updateAgreementDto: Agreement) {
    if (updateAgreementDto.id) {
      const index = this.agreements.findIndex(
        (agreement) => agreement.id == updateAgreementDto.id,
      );
      if (index != -1) {
        for (const agreementProps of Object.keys(updateAgreementDto)) {
          if (
            agreementProps === 'duration' ||
            agreementProps === 'remuneration'
          ) {
            this.agreements[index][agreementProps] =
              +updateAgreementDto[agreementProps];
          } else {
            this.agreements[index][agreementProps] =
              updateAgreementDto[agreementProps];
          }
        }
      }
    }
  }
}
