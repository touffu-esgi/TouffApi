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
    }),
  ];

  save(provider: Provider): Provider {
    this.providers.push(provider);
    return provider;
  }

  async getAll(): Promise<Provider[]> {
    return this.providers;
  }

  async getOne(id: string): Promise<Provider> {
    const provider = this.providers.filter((p) => p.id === id);

    if (!!provider) return this.providers[0];
    throw new ProviderNotFoundException(`Provider ${id} not found`);
  }

  getNextId(): string {
    return (this.providers.length + 1).toString();
  }
}
