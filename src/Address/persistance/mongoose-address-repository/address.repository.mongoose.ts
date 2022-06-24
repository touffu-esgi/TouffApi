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
      id: newAddress._id.toString(),
      addr1: newAddress.addr1,
      addr2: newAddress.addr2 ? newAddress.addr2 : '',
      city: newAddress.city,
      country: newAddress.country,
      zipcode: newAddress.zipcode,
    });
  }

  async getAll(filters: unknown): Promise<Address[]> {
    const addresses: AddressDocument[] = await this.addressModel
      .find(filters)
      .exec();
    return addresses.map(
      (address) =>
        new Address({
          addr1: address.addr1,
          addr2: address.addr2 ? address.addr2 : '',
          city: address.city,
          country: address.country,
          id: address.id,
          zipcode: address.zipcode,
        }),
    );
  }

  async getOne(addressId: string): Promise<Address> {
    const address: AddressDocument = await this.addressModel
      .findById(addressId)
      .exec();
    return new Address({
      addr1: address.addr1,
      addr2: address.addr2 ? address.addr2 : '',
      city: address.city,
      country: address.country,
      id: address.id,
      zipcode: address.zipcode,
    });
  }
}
