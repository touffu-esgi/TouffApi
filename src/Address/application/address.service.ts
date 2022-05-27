import { Injectable } from '@nestjs/common';
import { AddressRepositoryInMemory } from '../persistance/address.repository.in-memory';
import { GetAddressDto } from '../dto/get-address';
import { Address } from '../domain/address';
import { AddressProps } from '../../Providers/domain/address.props';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepositoryInMemory) {}

  async add(dto: GetAddressDto) {}

  getAll(filters: Partial<AddressProps>[] = []): Promise<Address[]> {
    return this.addressRepository.getAll(filters);
  }

  getOne(index): Promise<Address> {
    return this.addressRepository.getOne(index);
  }
}
