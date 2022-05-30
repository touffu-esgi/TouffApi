import { GetAddressDto } from '../dto/get-address';
import { AddressResponse } from '../domain/address.response';

export class AddressAdapter {
  public static fromDto(dto: GetAddressDto) {
    return new AddressResponse(
      dto.id,
      dto.addr1,
      dto.addr2 ? dto.addr2 : null,
      dto.cp,
      dto.city,
      dto.country,
    );
  }
}
