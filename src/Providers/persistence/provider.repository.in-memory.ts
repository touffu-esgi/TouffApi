import { ProviderRepository } from '../domain/provider.repository';
import { Provider } from '../domain/provider';

export class ProviderRepositoryInMemory implements ProviderRepository {
  private readonly providers: Provider[] = [
    new Provider({
      name: 'Nathan',
      surname: 'Letourneau',
      email: 'nletourneau@mail.mail',
      password: 'nletourneau',
      addr1: 'adresse',
      city: 'ville',
      country: 'France',
      cp: '83192',
      radius: 3,
      services: [],
    }),
  ];

  save(provider: Provider): Provider {
    this.providers.push(provider);
    return provider;
  }

  async getAll(): Promise<Provider[]> {
    return this.providers;
  }
}
