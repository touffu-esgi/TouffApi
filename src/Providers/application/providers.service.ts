import { Injectable } from '@nestjs/common';
import { ProviderRepositoryInMemory } from '../persistence/provider.repository.in-memory';
import { Provider } from '../domain/provider';
import { UserRepositoryInMemory } from '../../Users/persistence/user.repository.in-memory';
import { AddressRepositoryInMemory } from '../../Address/persistance/address.repository.in-memory';
import { Address } from '../../Address/domain/address';
import { UpdateProviderDto } from '../dto/update-provider.dto';

@Injectable()
export class ProvidersService {
  constructor(
    private providerRepository: ProviderRepositoryInMemory,
    private userRepository: UserRepositoryInMemory,
    private addressRepository: AddressRepositoryInMemory,
  ) {}

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
      animalType: providerEmptyId.animalType,
      base_tariff: providerEmptyId.base_tariff,
      radius: providerEmptyId.radius,
      profile_title: "Bonjour, je m'appelle " + providerEmptyId.name,
      profile_desc: 'Ce profil est personalisable',
    });
    await this.providerRepository.save(provider);
    return newId;
  }

  async getAll(filters: unknown = {}): Promise<Provider[]> {
    const providers = await this.providerRepository.getAll(filters);
    const outputProviders: Provider[] = [];
    let fitsFilters = true;
    for (const provider of providers) {
      fitsFilters = true;
      const providerUser =
        await this.userRepository.getOneByUserTypeAndReference(
          provider.id,
          'provider',
        );
      provider.userId = providerUser.id;
      if (filters['city']) {
        const address: Address[] = await this.addressRepository.getAll({
          id: provider.address,
          city: filters['city'],
        });
        if (address.length === 0) fitsFilters = false;
      }
      if (fitsFilters) outputProviders.push(provider);
    }
    return outputProviders;
  }

  async getOne(providerId: string): Promise<Provider> {
    const provider = await this.providerRepository.getOne(providerId);
    const providerUser = await this.userRepository.getOneByUserTypeAndReference(
      providerId,
      'provider',
    );
    provider.userId = providerUser.id;
    return provider;
  }

  async update(providerId: string, updateProviderDto: UpdateProviderDto) {
    const updateProvider = new Provider({
      address: updateProviderDto.address,
      animalType: updateProviderDto.animalType,
      base_tariff: updateProviderDto.base_tariff,
      email: updateProviderDto.email,
      id: providerId,
      name: updateProviderDto.name,
      password: updateProviderDto.password,
      phone: updateProviderDto.phone,
      profile_desc: updateProviderDto.profile_desc,
      profile_title: updateProviderDto.profile_title,
      radius: updateProviderDto.radius,
      surname: updateProviderDto.surname,
    });
    this.providerRepository.update(updateProvider);
  }
}
