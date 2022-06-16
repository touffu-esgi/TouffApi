import { RecipientResponse } from '../domain/recipient.response';
import { Recipient } from '../domain/recipient';
import { AddAddressDto } from '../../Address/dto/add-address.dto';
import { GetAddressDto } from '../../Address/dto/get-address.dto';
import { Address } from '../../Address/domain/addressProps';
import { AddRecipientDto } from '../dto/add-recipient';

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

  public static fromDtoToRecipient(dto: AddRecipientDto): Recipient {
    return new Recipient(
      '',
      dto.name,
      dto.surname,
      dto.email,
      dto.phoneNumber,
      dto.password,
      dto.address.id,
    );
  }
}
