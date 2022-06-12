import { ProviderRepository } from '../domain/provider.repository';
import { Provider } from '../domain/provider';
import { ProviderNotFoundException } from '../application/exceptions/provider-not-found-exception';

export class ProviderRepositoryInMemory implements ProviderRepository {
  private readonly providers: Provider[] = [
    new Provider({
      id: '1',
      name: 'Nathan',
      surname: 'Letourneau',
      email: 'nletourneau@mail.mail',
      password: 'nletourneau',
      address: '1',
      radius: 3,
      base_tariff: 30.2,
      profile_title: 'Touriste de service',
      profile_desc: 'Bla-bla-bla',
    }),
    new Provider({
      id: '2',
      name: 'Schlegel',
      surname: 'Sarah',
      email: 'sschlegel@wp.pl',
      password: 'sschlegel',
      address: '2',
      radius: 3,
      base_tariff: 30.2,
      profile_title: 'Touriste de service',
      profile_desc: 'Bla-bla-bla',
    }),
  ];

  async save(provider: Provider): Promise<Provider> {
    this.providers.push(provider);
    return provider;
  }

  async getAll(): Promise<Provider[]> {
    return this.providers;
  }

  async getOne(id: string): Promise<Provider> {
    const provider = this.providers.filter((p) => p.id === id);
    if (provider.length > 0) return provider[0];
    throw new ProviderNotFoundException(`Provider ${id} not found`);
  }

  getNextId(): string {
    return (this.providers.length + 1).toString();
  }
}
