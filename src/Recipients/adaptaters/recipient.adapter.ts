import { RecipientResponse } from '../domain/recipient.response';
import { Recipient } from '../domain/recipient';

export class RecipientAdapter {
  public static toRecipientResponse(dto: Recipient, baseUrlOf: string) {
    return new RecipientResponse(
      dto.id,
      dto.name,
      dto.surname,
      dto.email,
      dto.phoneNumber,
      baseUrlOf + '/address/' + dto.address,
      dto.userId,
    );
  }
}
