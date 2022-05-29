import { AddRecipientDto } from '../dto/add-recipient';
import { RecipientResponse } from '../domain/recipient.response';

export class RecipientAdapter {
  public static fromAnimalToAnimalResponse(dto: AddRecipientDto) {
    return new RecipientResponse(
      dto.name,
      dto.surname,
      dto.email,
      dto.phoneNumber,
      dto.password,
      dto.address,
    );
  }
}
