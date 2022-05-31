import { Injectable } from '@nestjs/common';
import { AddressRepositoryInMemory } from '../persistance/address.repository.in-memory';
import { Address } from '../domain/address';
import { AddAddressDto } from '../dto/add-address.dto';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepositoryInMemory) {}

  async getAll(filters: unknown = {}): Promise<Address[]> {
    return await this.addressRepository.getAll(filters);
  }

  async getOne(addressId): Promise<Address> {
    return await this.addressRepository.getOne(addressId);
  }

  async add(dto: AddAddressDto): Promise<Address> {
    const newId = this.addressRepository.getNextId();
    const address = new Address({
      id: newId,
      addr1: dto.addr1,
      addr2: dto.addr2 ? dto.addr2 : null,
      zipcode: dto.zipcode,
      city: dto.city,
      country: dto.country,
    });
    return await this.addressRepository.add(address);
  }
}
