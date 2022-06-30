import { AgreementRepositoryInMemory } from '../persistence/agreement.repository.in-memory';
import { Agreement } from '../domain/agreement';
import { Injectable } from '@nestjs/common';
import { AddAgreementDto } from '../dto/add-agreement.dto';
import {
  AgreementRecurrenceEnum,
  getAgreementRecurrenceEnumFromString,
} from '../domain/agreement.recurrence.enum';
import { AvailabilityRepositoryInMemory } from '../../Availability/persistence/availability.repository.in-memory';
import {
  timeIsInTimeframe,
  timeToDouble,
} from '../../shared/utils/date-time.utils';
import { ProviderBusyException } from './exceptions/provider-busy.exception';

@Injectable()
export class AgreementService {
  constructor(
    private agreementRepository: AgreementRepositoryInMemory,
    private availabilityRepository: AvailabilityRepositoryInMemory,
  ) {}

  async getAll(filters: unknown): Promise<Agreement[]> {
    return await this.agreementRepository.getAll(filters);
  }

  async getOneFromAnimalAndDatetime(
    dt: Date,
    animalId: string,
  ): Promise<Agreement> {
    return await this.agreementRepository.getOneFromAnimalAndDatetime(
      dt,
      animalId,
    );
  }

  async getOne(agreementId: string): Promise<Agreement> {
    return await this.agreementRepository.getOne(agreementId);
  }

  async add(dto: AddAgreementDto): Promise<Agreement> {
    const newId = this.agreementRepository.getNextId();
    const recurrence = dto.recurring
      ? getAgreementRecurrenceEnumFromString(dto.recurrence)
      : AgreementRecurrenceEnum.None;
    const beginDate = new Date(dto.beginningDate);
    const endDate = new Date(dto.endDate);
    const providerBusyAvailability =
      await this.availabilityRepository.getWeeklyDefaultAvailability(
        dto.providerRef,
      );
    let noOverlaps = true;
    providerBusyAvailability.forEach((weekday) => {
      noOverlaps =
        noOverlaps &&
        this.findIfNoOverlaps(
          beginDate,
          dto.duration,
          weekday.dailyAvailability,
        );
      if (!noOverlaps)
        throw new ProviderBusyException(
          `Provider is already busy on ${weekday.day}`,
        );
    });

    const agreement = new Agreement({
      id: newId,
      recurring: dto.recurring,
      recurrence: recurrence,
      providerRef: dto.providerRef,
      recipientRef: dto.recipientRef,
      animalsRefs: dto.animalsRefs,
      beginningDate: beginDate,
      endDate: endDate,
      duration: dto.duration,
      remuneration: dto.remuneration,
      status: 'Agreed',
    });
    return await this.agreementRepository.add(agreement);
  }

  private findIfNoOverlaps(
    beginDate: Date,
    duration: number,
    occupiedTimeframes: { beginAt: number; endAt: number }[],
  ): boolean {
    const beginTime = timeToDouble(beginDate);
    const endTime = beginTime + duration;
    occupiedTimeframes.filter(
      (timeframe) =>
        timeIsInTimeframe(beginTime, timeframe) &&
        timeIsInTimeframe(endTime, timeframe),
    );
    return occupiedTimeframes.length > 0;
  }
}
