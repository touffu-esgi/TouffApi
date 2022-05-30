import { GetAddressDto } from '../dto/get-address';
import { AddressResponse } from '../domain/address.response';

export class AddressAdapter {
  public static fromAddressToAddressResponse(address: GetAddressDto) {
    return new AddressResponse(
      address.id,
      address.addr1,
      address.addr2 ? address.addr2 : null,
      address.cp,
      address.city,
      address.country,
    );
  }
}
