import { Injectable } from '@nestjs/common';
import { AddressRepositoryInMemory } from '../persistance/address.repository.in-memory';
import { GetAddressDto } from '../dto/get-address';
import { Address } from '../domain/address';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepositoryInMemory) {}

  async add(dto: GetAddressDto) {}

  getAll(): Promise<Address[]> {
    return this.addressRepository.getAll();
  }

  getOne(index): Promise<Address> {
    return this.addressRepository.getOne(index);
  }
}
