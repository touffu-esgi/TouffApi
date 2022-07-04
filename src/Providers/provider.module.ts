import { Module } from '@nestjs/common';
import { ProvidersController } from './exposition/controller/providers.controller';
import { ProvidersService } from './application/providers.service';
import { ProviderRepositoryInMemory } from './persistence/provider.repository.in-memory';
import { AddressService } from '../Address/application/address.service';
import { AddressRepositoryInMemory } from '../Address/persistance/address.repository.in-memory';
import { UserRepositoryInMemory } from '../Users/persistence/user.repository.in-memory';

@Module({
  controllers: [ProvidersController],
  providers: [
    ProvidersService,
    ProviderRepositoryInMemory,
    AddressService,
    AddressRepositoryInMemory,
    UserRepositoryInMemory,
  ],
})
export class ProviderModule {}
