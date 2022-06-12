import { AgreementRepositoryInMemory } from '../persistence/agreement.repository.in-memory';
import { Agreement } from '../domain/agreement';
import { Injectable } from '@nestjs/common';
import { AddAgreementDto } from '../dto/add-agreement.dto';
import {
  AgreementRecurrenceEnum,
  getAgreementRecurrenceEnumFromString,
} from '../domain/agreement.recurrence.enum';

@Injectable()
export class AgreementService {
  constructor(private agreementRepository: AgreementRepositoryInMemory) {}

  async getAll(filters: unknown): Promise<Agreement[]> {
    return await this.agreementRepository.getAll(filters);
  }

  async getOne(agreementId: string): Promise<Agreement> {
    return await this.agreementRepository.getOne(agreementId);
  }

  async add(dto: AddAgreementDto): Promise<Agreement> {
    const newId = this.agreementRepository.getNextId();
    const recurrence = dto.recurring
      ? getAgreementRecurrenceEnumFromString(dto.recurrence)
      : AgreementRecurrenceEnum.None;
    const agreement = new Agreement({
      id: newId,
      recurring: dto.recurring,
      recurrence: recurrence,
      providerRef: dto.providerRef,
      recipientRef: dto.recipientRef,
      animalsRefs: dto.animalsRefs,
      beginningDate: new Date(dto.beginningDate),
      endDate: new Date(dto.endDate),
      duration: dto.duration,
      remuneration: dto.remuneration,
    });
    return await this.agreementRepository.add(agreement);
  }
}
