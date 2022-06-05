import { Agreement } from './agreement';

export interface AgreementRepository {
  getAll(filters: unknown): Promise<Agreement[]>;
  getOne(agreementId: string): Promise<Agreement>;
  add(agreement: Agreement): Promise<Agreement>;
}
