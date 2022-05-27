import { Address } from '../domain/address';

export class AddressRepositoryInMemory {
  public readonly addresses: Address[] = [
    new Address({
      id: '1',
      addr1: '1 Chemin des roses',
      cp: '31290',
      city: 'Rosaphir',
      country: 'Earth',
    }),
  ];

  async getAll(): Promise<Address[]> {
    return this.addresses;
  }

  async getOne(index: number): Promise<Address | null> {
    if (index < this.addresses.length) return this.addresses[index];
    return null;
  }
}
