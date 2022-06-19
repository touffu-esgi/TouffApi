import { Agreement } from '../domain/agreement';
import { AgreementResponse } from '../domain/agreement.response';
import { AgreementRecurrenceEnum } from '../domain/agreement.recurrence.enum';

export class AgreementAdapter {
  public static toAgreementResponse(agreement: Agreement, baseUrl: string) {
    const animals = agreement.animalsRefs.map(
      (animal) => baseUrl + '/animals/' + animal,
    );
    return new AgreementResponse({
      id: agreement.id,
      recurring: agreement.recurring,
      recurrence: agreement.recurring
        ? agreement.recurrence
        : AgreementRecurrenceEnum.None,
      providerRef: baseUrl + '/provider/' + agreement.providerRef,
      recipientRef: baseUrl + '/recipient/' + agreement.recipientRef,
      animalsRefs: animals,
      beginningDate: agreement.beginningDate,
      endDate: agreement.endDate,
      duration: agreement.duration * 60,
      remuneration: agreement.remuneration,
    });
  }
}
