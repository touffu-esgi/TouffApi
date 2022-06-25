import { Address } from './address';
import { AddressProps } from '../persistance/mongoose-address-repository/address.schema';

export interface AddressRepository {
  getAll(filters: unknown): Promise<Address[]>;
  getOne(addressId: string): Promise<Address>;
  add(address: AddressProps): Promise<Address>;
}
