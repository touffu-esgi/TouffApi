import { Position } from '../domain/position';
import { PositionRepository } from '../domain/position.repository';
import { EmptyPositionsException } from '../application/exceptions/empty-positions.exception';

export class PositionRepositoryInMemory implements PositionRepository {
  private positions: Position[] = [
    new Position({
      id: '1',
      agreementRef: '1',
      xCoordinate: 48.52,
      yCoordinate: 2.2,
      datetime: new Date('2022-06-25T21:30:00'),
    }),
    new Position({
      id: '2',
      agreementRef: '1',
      xCoordinate: 48.32,
      yCoordinate: 2.1,
      datetime: new Date('2022-06-25T21:30:10'),
    }),
  ];

  async getLastByAgreement(agreementId: string): Promise<Position> {
    const positions = this.positions.filter(
      (position) => position.agreementRef === agreementId,
    );
    if (positions.length > 0) return positions.pop();
    throw new EmptyPositionsException(
      `No position for agreement ${agreementId}`,
    );
  }

  getNextId(): string {
    throw new Error('Not implemented');
  }

  async getRoute(
    agreementId: string,
    dateFrom: Date,
    dateTo: Date,
  ): Promise<Position[]> {
    const positions = this.positions.filter(
      (position) =>
        position.agreementRef === agreementId &&
        position.datetime >= dateFrom &&
        position.datetime <= dateTo,
    );
    if (positions.length > 0) return positions;
    throw new EmptyPositionsException(
      `No position for agreement ${agreementId} between ${dateFrom} && ${dateTo}`,
    );
  }
}
