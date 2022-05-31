import { GetAddressDto } from '../dto/get-address.dto';
import { AddressResponse } from '../domain/address.response';

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
}
