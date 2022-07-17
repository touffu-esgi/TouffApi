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
  addMonthsToDate,
  timeIsInTimeframe,
  timeToDouble,
} from '../../shared/utils/date-time.utils';
import { ProviderBusyException } from './exceptions/provider-busy.exception';
import { UpdateAgreementDto } from '../dto/update-agreement.dto';
import { Availability } from '../../Availability/domain/availability';
import { IntWeekDays } from '../../Availability/domain/weekdays';

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
    const endDate = dto.endDate
      ? new Date(dto.endDate)
      : addMonthsToDate(beginDate, 6);

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
      status: 'InDiscussion',
    });
    return await this.agreementRepository.add(agreement);
  }

  async update(dto: UpdateAgreementDto, agreementId: string) {
    const recurrence = dto.recurring
      ? getAgreementRecurrenceEnumFromString(dto.recurrence)
      : AgreementRecurrenceEnum.None;

    const previousAgreement = await this.getOne(agreementId);
    const termsHaveChanged = this.checkIfChangesToAgreement(
      previousAgreement,
      dto,
    );
    const agreementCombination: {
      agreedByProvider: boolean;
      agreedByRecipient: boolean;
      newStatus: string;
    } = AgreementService.agreementStatusCombinationsCompute(
      termsHaveChanged,
      dto,
      previousAgreement,
    );

    const agreement = new Agreement({
      id: agreementId,
      recurring: dto.recurring ? dto.recurring : previousAgreement.recurring,
      recurrence: recurrence,
      providerRef: previousAgreement.providerRef,
      recipientRef: previousAgreement.recipientRef,
      animalsRefs: dto.animals ? dto.animals : previousAgreement.animalsRefs,
      beginningDate: dto.beginningDate
        ? dto.beginningDate
        : previousAgreement.beginningDate,
      endDate: dto.endDate ? dto.endDate : previousAgreement.endDate,
      duration: dto.duration ? dto.duration : previousAgreement.duration,
      remuneration: dto.remuneration
        ? dto.remuneration
        : previousAgreement.remuneration,
      status: agreementCombination.newStatus,
      agreedByProvider: agreementCombination.agreedByProvider,
      agreedByRecipient: agreementCombination.agreedByRecipient,
    });

    this.agreementRepository.update(agreement);
  }

  private static agreementStatusCombinationsCompute(
    termsHaveChanged: boolean,
    dto: UpdateAgreementDto,
    previousAgreement: Agreement,
  ): {
    agreedByProvider: boolean;
    agreedByRecipient: boolean;
    newStatus: string;
  } {
    let agreedByProvider = false;
    let agreedByRecipient = false;
    let newStatus = previousAgreement.status;

    if (termsHaveChanged) {
      if (dto.agreedByProvider) {
        agreedByProvider = true;
      } else if (dto.agreedByRecipient) {
        agreedByRecipient = true;
      }
    } else {
      if (
        (previousAgreement.agreedByRecipient && dto.agreedByProvider) ||
        (previousAgreement.agreedByProvider && dto.agreedByRecipient)
      ) {
        agreedByRecipient = true;
        agreedByProvider = true;
        if (newStatus === 'InDiscussion') newStatus = 'Agreed';
      }
    }
    return {
      agreedByProvider: agreedByProvider,
      agreedByRecipient: agreedByRecipient,
      newStatus: newStatus,
    };
  }

  private checkIfChangesToAgreement(
    previousAgreement: Agreement,
    newAgreement: UpdateAgreementDto,
  ): boolean {
    for (const propName of Object.keys(previousAgreement)) {
      if (propName !== 'agreedByProvider' && propName !== 'agreedByRecipient') {
        if (
          newAgreement[propName] &&
          newAgreement[propName] !== previousAgreement[propName]
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
