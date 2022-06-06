import { Injectable } from '@nestjs/common';
import { ProviderRepositoryInMemory } from '../persistence/provider.repository.in-memory';
import { AddProviderDto } from '../dto/add-provider.dto';
import { Provider } from '../domain/provider';

@Injectable()
export class ProvidersService {
  constructor(private providerRepository: ProviderRepositoryInMemory) {}

  async add(providerEmptyId: Provider) {
    const newId = this.providerRepository.getNextId();
    const provider = new Provider({
      id: newId,
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
    });
    await this.providerRepository.save(provider);
    return newId;
  }

  async getAll(): Promise<Provider[]> {
    return await this.providerRepository.getAll();
  }

  async getOne(id: string): Promise<Provider> {
    return await this.providerRepository.getOne(id);
  }
}
