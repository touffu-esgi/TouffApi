import { Address } from '../domain/address';
import { AddressProps } from '../../Providers/domain/address.props';

export class AddressRepositoryInMemory {
  public readonly addresses: Address[] = [
    new Address({
      id: '1',
      addr1: '1 Chemin des roses',
      cp: '31290',
      city: 'Rosaphir',
      country: 'Earth',
    }),
    new Address({
      id: '2',
      addr1: '1 Chemin des châtaigners',
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

  async getAll(filters: Partial<AddressProps>[] = []): Promise<Address[]> {
    if (filters) {
      const addresses = this.addresses;
      const addr = addresses.filter((addr) =>
        this.filterAndUtil(filters, addr),
      );
      return addr;
    }
    return this.addresses;
  }

  filterAndUtil(
    filters: Partial<AddressProps>[],
    addrItem: AddressProps,
  ): boolean {
    let fitsFilter = true;
    Object.keys(filters).forEach((propName) => {
      fitsFilter =
        fitsFilter &&
        addrItem['_' + propName].indexOf(filters[propName]) !== -1;
    });
    return fitsFilter;
  }

  filterOrUtil(
    filters: Partial<AddressProps>[],
    addrItem: AddressProps,
  ): boolean {
    let fitsFilter = true;
    Object.keys(filters).forEach((propName) => {
      fitsFilter =
        fitsFilter || addrItem[propName].indexOf(filters[propName]) !== -1;
    });
    return fitsFilter;
  }

  async getOne(index: number): Promise<Address | null> {
    if (index < this.addresses.length) return this.addresses[index];
    return null;
  }
}
