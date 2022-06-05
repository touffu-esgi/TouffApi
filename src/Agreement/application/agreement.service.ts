import { AgreementRepositoryInMemory } from '../persistence/agreement.repository.in-memory';
import { Agreement } from '../domain/agreement';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AgreementService {
  constructor(private agreementRepository: AgreementRepositoryInMemory) {}

  async getAll(filters: unknown = {}): Promise<Agreement[]> {
    return await this.agreementRepository.getAll(filters);
  }
}
