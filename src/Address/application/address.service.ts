import { Injectable } from '@nestjs/common';
import { AddressRepositoryInMemory } from '../persistance/address.repository.in-memory';
import { Address } from '../domain/address';
import { AddressRepositoryMongoose } from '../persistance/mongoose-address-repository/address.repository.mongoose';
import { AddressProps } from '../persistance/mongoose-address-repository/address.schema';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepositoryMongoose) {}

  async getAll(filters: unknown = {}): Promise<Address[]> {
    return await this.addressRepository.getAll(filters);
  }

  async getOne(addressId): Promise<Address> {
    return await this.addressRepository.getOne(addressId);
  }

  async add(addressEmptyId: Address): Promise<Address> {
    const address: AddressProps = {
      addr1: addressEmptyId.addr1,
      addr2: addressEmptyId.addr2 ? addressEmptyId.addr2 : null,
      zipcode: addressEmptyId.zipcode,
      city: addressEmptyId.city,
      country: addressEmptyId.country,
    };
    return await this.addressRepository.add(address);
  }
}
