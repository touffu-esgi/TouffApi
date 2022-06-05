import { AgreementRepository } from '../domain/agreement.repository';
import { Agreement } from '../domain/agreement';
import { AgreementRecurrenceEnum } from '../domain/agreement.recurrence.enum';

export class AgreementRepositoryInMemory implements AgreementRepository {
  private readonly agreements = [
    new Agreement({
      id: '1',
      recurring: true,
      recurrence: AgreementRecurrenceEnum.Weekly,
      providerRef: '1',
      recipientRef: '1',
      animalsRefs: ['1', '2'],
      beginningDate: new Date(2022, 6, 1, 14, 30),
      endDate: new Date(2022, 12, 1, 14, 30),
      duration: 60,
      remuneration: 25.5,
    }),
    new Agreement({
      id: '2',
      recurring: false,
      providerRef: '2',
      recipientRef: '1',
      animalsRefs: ['3'],
      beginningDate: new Date(2022, 6, 1, 13, 23),
      endDate: new Date(2022, 6, 1, 13, 23),
      duration: 120,
      remuneration: 130.0,
    }),
  ];

  async getAll(filters: unknown): Promise<Agreement[]> {
    console.log(this.agreements);
    return this.agreements;
  }

  async getOne(agreementId: string): Promise<Agreement> {
    return this.agreements[parseInt(agreementId)];
  }

  async add(agreement: Agreement): Promise<Agreement> {
    throw new Error('To implement');
  }

  getNextId(): string {
    return (this.agreements[-1].id + 1).toString();
  }
}
