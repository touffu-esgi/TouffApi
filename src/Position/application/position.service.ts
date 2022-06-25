import { Injectable } from '@nestjs/common';
import { PositionRepositoryInMemory } from '../persistence/position.repository.in-memory';
import { Position } from '../domain/position';

@Injectable()
export class PositionService {
  constructor(private positionRepository: PositionRepositoryInMemory) {}
  async getLastByAgreement(agreementId: string): Promise<Position> {
    return this.positionRepository.getLastByAgreement(agreementId);
  }
}
