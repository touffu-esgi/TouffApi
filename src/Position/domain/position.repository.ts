import { Position } from './position';

export interface PositionRepository {
  getLastByAgreement(agreementId: string): Promise<Position>;
  getRoute(
    agreementId: string,
    dateFrom: Date,
    dateTo: Date,
  ): Promise<Position[]>;
  getNextId(): string;
}
