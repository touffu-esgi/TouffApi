import { ProviderRepository } from '../domain/provider.repository';
import { Provider } from '../domain/provider';
import { ProviderNotFoundException } from '../application/exceptions/provider-not-found-exception';
import { filterByProp } from '../../shared/utils/filtering.utils';

export class ProviderRepositoryInMemory implements ProviderRepository {
  private readonly providers: Provider[] = [
    new Provider({
      id: '1',
      name: 'Nathan',
      surname: 'Letourneau',
      email: 'nletourneau@mail.mail',
      password: 'nletourneau',
      address: '1',
      animalType: ['chien', 'chat'],
      radius: 3,
      base_tariff: 30.2,
      profile_title: 'Touriste de service',
      profile_desc: 'Bla-bla-bla',
      profile_pic: '',
    }),
    new Provider({
      id: '2',
      name: 'Schlegel',
      surname: 'Sarah',
      email: 'sarah@sarah.sarah',
      password: 'password',
      address: '2',
      animalType: ['chien'],
      radius: 3,
      base_tariff: 30.2,
      profile_title: 'Touriste de service',
      profile_desc: 'Bla-bla-bla',
      profile_pic: '',
    }),
    new Provider({
      id: '3',
      name: 'Omnes',
      surname: 'Théo',
      email: 'Theo@Theo.Theo',
      password: 'password',
      address: '2',
      animalType: ['chat', 'chameau'],
      radius: 3,
      base_tariff: 18,
      profile_title: 'Touriste de service',
      profile_desc: 'Bla-bla-bla',
      profile_pic: '',
    }),
  ];

  async save(provider: Provider): Promise<Provider> {
    this.providers.push(provider);
    return provider;
  }

  async getAll(filters: unknown = {}): Promise<Provider[]> {
    let providers = this.providers;
    if (filters) {
      Object.keys(filters).forEach((propName) => {
        providers = providers.filter((provider) =>
          filterByProp(provider, propName, filters[propName]),
        );
      });
    }
    return providers;
  }

  async getOne(id: string): Promise<Provider> {
    const provider = this.providers.filter((p) => p.id === id);
    if (provider.length > 0) return provider[0];
    throw new ProviderNotFoundException(`Provider ${id} not found`);
  }

  getNextId(): string {
    return (this.providers.length + 1).toString();
  }

  update(updateProvider: Provider) {
    const index = this.providers.findIndex(
      (provider) => provider.id === updateProvider.id,
    );
    if (index != -1) {
      for (const providerProps of Object.keys(updateProvider)) {
        if (updateProvider[providerProps]) {
          this.providers[index][providerProps] = updateProvider[providerProps];
        }
      }
    } else {
      throw new ProviderNotFoundException(
        `provider with id ${updateProvider.id} not found`,
      );
    }
  }
}
