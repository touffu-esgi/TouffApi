import { AddressProps } from '../domain/address.props';
import { HttpException } from '@nestjs/common';
import { AddressRepository } from '../domain/address.repository';
import { Address } from '../domain/addressProps';

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
    if (filters) {
      let addr = this.addresses;
      if (filters['and']) {
        addr = this.addresses.filter((addr) =>
          this.filterAndUtil(filters['and'], addr),
        );
      } else if (filters['or']) {
        addr = this.addresses.filter((addr) =>
          this.filterOrUtil(filters['or'], addr),
        );
      }
      return addr;
    }
    return this.addresses;
  }

  filterAndUtil(filters: unknown = {}, addrItem: AddressProps): boolean {
    let fitsFilter = true;
    Object.keys(filters).forEach((propName) => {
      const addrProp = addrItem['_' + propName];
      if (!addrProp) return false;
      fitsFilter =
        fitsFilter &&
        addrProp.toLowerCase().indexOf(filters[propName].toLowerCase()) !== -1;
    });
    return fitsFilter;
  }

  filterOrUtil(filters: unknown = {}, addrItem: AddressProps): boolean {
    let fitsFilter = true;
    Object.keys(filters).forEach((propName) => {
      const addrProp = addrItem['_' + propName];
      if (!addrProp) return false;
      fitsFilter =
        fitsFilter ||
        addrProp.toLowerCase().indexOf(filters[propName].toLowerCase()) !== -1;
    });
    return fitsFilter;
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
}
