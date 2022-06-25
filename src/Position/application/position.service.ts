import { Injectable } from '@nestjs/common';
import { PositionRepositoryInMemory } from '../persistence/position.repository.in-memory';
import { Position } from '../domain/position';

@Injectable()
export class PositionService {
  constructor(private positionRepository: PositionRepositoryInMemory) {}

  async getLastByAgreement(agreementId: string): Promise<Position> {
    return await this.positionRepository.getLastByAgreement(agreementId);
  }

  async getRoute(agreementId: string, dateFrom: string, dateTo: string) {
    return await this.positionRepository.getRoute(
      agreementId,
      new Date(dateFrom),
      new Date(dateTo),
    );
  }
}
