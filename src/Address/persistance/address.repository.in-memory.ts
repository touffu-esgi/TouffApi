import { Address } from '../domain/address';

export class AddressRepositoryInMemory {
  public readonly addresses: Address[] = [
    new Address({
      id: '1',
      addr1: '1 Chemin des roses',
      zipcode: '31290',
      city: 'Rosaphir',
      country: 'Earth',
    }),
  ];

  async getAll(): Promise<Address[]> {
    return this.addresses;
  }

  async getOne(addressId: number): Promise<Address | null> {
    if (addressId < this.addresses.length) return this.addresses[addressId];
    return null;
  }
}
