import { RecipientResponse } from '../domain/recipient.response';
import { Recipient } from '../domain/recipient';

export class RecipientAdapter {
  public static fromAnimalToAnimalResponse(dto: Recipient) {
    return new RecipientResponse(
      dto.id,
      dto.name,
      dto.surname,
      dto.email,
      dto.phoneNumber,
      dto.address,
    );
  }
}
