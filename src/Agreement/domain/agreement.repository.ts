import { Agreement } from './agreement';

export interface AgreementRepository {
  getAll(): Promise<Agreement[]>;
  getOne(agreementId: string): Promise<Agreement>;
  add(agreementId: Agreement): Promise<Agreement>;
}
