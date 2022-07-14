import { Address } from '../domain/address';
import { HttpException } from '@nestjs/common';
import { AddressRepository } from '../domain/address.repository';

export class AddressRepositoryInMemory implements AddressRepository {
  private readonly addresses: Address[] = [
    new Address({
      id: '1',
      addr1: '1 Chemin des roses',
      zipcode: '31290',
      city: 'Rosaphir',
      country: 'Earth',
    }),
    new Address({
      id: '2',
      addr1: '3 Chemin des châtaigners',
      zipcode: '21900',
      city: 'City-town',
      country: 'Earth',
    }),
    new Address({
      id: '3',
      addr1: '1 Rue de France',
      zipcode: '92300',
      city: 'Village',
      country: 'Earth',
    }),
  ];

  async getAll(filters: unknown = {}): Promise<Address[]> {
    let addresses = this.addresses;
    if (filters) {
      Object.keys(filters).forEach((propName) => {
        addresses = addresses.filter(
          (address) =>
            !address[propName] ||
            address[propName].indexOf(filters[propName]) !== -1,
        );
      });
    }
    return addresses;
  }

  async getOne(addressId: string): Promise<Address> {
    const address = this.addresses.filter(
      (address) => address.id === addressId,
    );
    if (address.length > 0) return address[0];
    throw new HttpException(`Address ${addressId} not found`, 404);
  }

  async add(address: Address): Promise<Address> {
    this.addresses.push(address);
    return address;
  }

  getNextId(): string {
    return (+this.addresses.at(-1).id + 1).toString();
  }

  update(updatedAddress: Address) {
    const index = this.addresses.findIndex(
      (address) => address.id == updatedAddress.id,
    );

    if (index != -1) {
      for (const adderssProps of Object.keys(updatedAddress)) {
        if (updatedAddress[adderssProps]) {
          this.addresses[index][adderssProps] = updatedAddress[adderssProps];
        }
      }
    }
  }
}
