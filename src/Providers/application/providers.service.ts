import { Injectable } from '@nestjs/common';
import { ProviderRepositoryInMemory } from '../persistence/provider.repository.in-memory';
import { AddProviderDto } from '../dto/add-provider.dto';
import { Provider } from '../domain/provider';

@Injectable()
export class ProvidersService {
  constructor(private providerRepository: ProviderRepositoryInMemory) {}

  async add(dto: AddProviderDto) {
    const newId = this.providerRepository.getNextId();
    const provider = new Provider({
      id: newId,
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      password: dto.password,
      phone: dto.phone,
      address: dto.address,
      base_tariff: dto.base_tariff,
      radius: dto.radius,
    });
    this.providerRepository.save(provider);
    return newId;
  }

  getAll(): Promise<Provider[]> {
    return this.providerRepository.getAll();
  }
}
