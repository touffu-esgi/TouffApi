import { Position } from '../domain/position';
import { PositionRepository } from '../domain/position.repository';

export class PositionRepositoryInMemory implements PositionRepository {
  private positions: Position[] = [
    new Position({
      id: '1',
      agreementRef: '1',
      xCoordinate: 48.52,
      yCoordinate: 2.2,
      datetime: new Date(),
    }),
    new Position({
      id: '2',
      agreementRef: '1',
      xCoordinate: 48.32,
      yCoordinate: 2.1,
      datetime: new Date(),
    }),
  ];

  async getLastByAgreement(agreementId: string): Promise<Position> {
    const positions = this.positions.filter(
      (position) => position.agreementRef === agreementId,
    );
    if (positions.length > 0) return positions.pop();
    throw new Error('Empty error to throw');
  }

  getNextId(): string {
    throw new Error('Not implemented');
  }

  getRoute(
    agreementId: string,
    dateFrom: Date,
    dateTo: Date,
  ): Promise<Position[]> {
    throw new Error('Not implemented');
  }
}
