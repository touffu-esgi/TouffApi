import { ProviderRepository } from '../domain/provider.repository';
import { Provider } from '../domain/provider';

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

  getNextId(): string {
    return (this.providers.length + 1).toString();
  }
}
