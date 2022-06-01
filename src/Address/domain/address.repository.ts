import { Address } from './address';

export interface AddressRepository {
  getAll(): Promise<Address[]>;
  getOne(addressId: string): Promise<Address>;
  add(address: Address): Promise<Address>;
}
