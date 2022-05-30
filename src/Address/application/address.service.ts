import { Injectable } from '@nestjs/common';
import { AddressRepositoryInMemory } from '../persistance/address.repository.in-memory';
import { GetAddressDto } from '../dto/get-address';
import { Address } from '../domain/address';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepositoryInMemory) {}

  async add(dto: GetAddressDto) {}

  async getAll(): Promise<Address[]> {
    return await this.addressRepository.getAll();
  }

  async getOne(addressId): Promise<Address> {
    return await this.addressRepository.getOne(addressId);
  }
}
