import { Injectable } from '@nestjs/common';
import { PositionRepositoryInMemory } from '../persistence/position.repository.in-memory';
import { Position } from '../domain/position';
import { AddPositionDto } from '../dto/add-position.dto';

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

  async add(dto: AddPositionDto): Promise<Position> {
    const nextId = this.positionRepository.getNextId();
    const position = new Position({
      id: nextId,
      datetime: new Date(),
      xCoordinate: dto.xCoordinate,
      yCoordinate: dto.yCoordinate,
      agreementRef: dto.agreementRef,
    });
    return await this.positionRepository.add(position);
  }
}
