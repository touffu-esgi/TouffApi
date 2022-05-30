import { Address } from '../domain/address';
import { AddressProps } from '../../Providers/domain/address.props';

export class AddressRepositoryInMemory {
  public readonly addresses: Address[] = [
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
      cp: '21900',
      city: 'City-town',
      country: 'Earth',
    }),
    new Address({
      id: '3',
      addr1: '1 Rue de France',
      cp: '92300',
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
      fitsFilter =
        fitsFilter &&
        addrItem['_' + propName]
          .toLowerCase()
          .indexOf(filters[propName].toLowerCase()) !== -1;
    });
    return fitsFilter;
  }

  filterOrUtil(filters: unknown = {}, addrItem: AddressProps): boolean {
    let fitsFilter = true;
    Object.keys(filters).forEach((propName) => {
      fitsFilter =
        fitsFilter ||
        addrItem['_' + propName]
          .toLowerCase()
          .indexOf(filters[propName].toLowerCase()) !== -1;
    });
    return fitsFilter;
  }
  async getOne(addressId: number): Promise<Address | null> {
    if (addressId < this.addresses.length) return this.addresses[addressId];
    return null;
  }
}
