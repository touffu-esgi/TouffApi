import { AddressRepository } from '../../domain/address.repository';
import { Address } from '../../domain/address';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressDocument, AddressProps } from './address.schema';

export class AddressRepositoryMongoose implements AddressRepository {
  constructor(
    @InjectModel('Address') private addressModel: Model<AddressDocument>,
  ) {}

  async add(address: AddressProps): Promise<Address> {
    const newAddress: AddressDocument = await this.addressModel.create(address);
    return new Address({
      id: newAddress._id,
      addr1: newAddress.addr1,
      addr2: newAddress.addr2 ? newAddress.addr2 : '',
      city: newAddress.city,
      country: newAddress.country,
      zipcode: newAddress.zipcode,
    });
  }

  getAll(filters: unknown): Promise<Address[]> {
    return Promise.resolve([]);
  }

  getOne(addressId: string): Promise<Address> {
    return Promise.resolve(undefined);
  }
}
