import { Injectable } from '@nestjs/common';
import { ProviderRepositoryInMemory } from '../persistence/provider.repository.in-memory';
import { Provider } from '../domain/provider';
import { ProviderRepositoryMongoose } from '../persistence/mongoose-provider-repository/provider.repository.mongoose';
import { ProviderProps } from '../domain/provider.props';

@Injectable()
export class ProvidersService {
  constructor(private providerRepository: ProviderRepositoryMongoose) {}

  async add(providerEmptyId: Provider): Promise<Provider> {
    const provider: ProviderProps = {
      name: providerEmptyId.name,
      surname: providerEmptyId.surname,
      email: providerEmptyId.email,
      password: providerEmptyId.password,
      phone: providerEmptyId.phone,
      address: providerEmptyId.address,
      base_tariff: providerEmptyId.base_tariff,
      radius: providerEmptyId.radius,
      profile_title: "Bonjour, je m'appelle " + providerEmptyId.name,
      profile_desc: 'Ce profil est personalisable',
    };
    return await this.providerRepository.save(provider);
  }

  async getAll(): Promise<Provider[]> {
    return await this.providerRepository.getAll();
  }

  async getOne(id: string): Promise<Provider> {
    return await this.providerRepository.getOne(id);
  }
}
