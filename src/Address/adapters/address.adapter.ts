import { GetAddressDto } from '../dto/get-address.dto';
import { AddressResponse } from '../domain/address.response';
import { AddAddressDto } from '../dto/add-address.dto';
import { Address } from '../domain/addressProps';

export class AddressAdapter {
  public static fromAddressToAddressResponse(address: GetAddressDto) {
    return new AddressResponse(
      address.id,
      address.addr1,
      address.addr2 ? address.addr2 : null,
      address.zipcode,
      address.city,
      address.country,
    );
  }

  public static fromDtoToAddress(dto: AddAddressDto | GetAddressDto): Address {
    return new Address({
      id: dto['id'] ? dto['id'] : '',
      addr1: dto.addr1,
      addr2: dto.addr2 ? dto.addr2 : null,
      zipcode: dto.zipcode,
      city: dto.city,
      country: dto.country,
    });
  }
}
