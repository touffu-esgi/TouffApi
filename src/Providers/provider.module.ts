import { Module } from '@nestjs/common';
import { ProvidersController } from './exposition/controller/providers.controller';
import { ProvidersService } from './application/providers.service';
import { ProviderRepositoryInMemory } from './persistence/provider.repository.in-memory';
import { UserModule } from '../Users/user.module';
import { AddressModule } from '../Address/address.module';

@Module({
  controllers: [ProvidersController],
  imports: [UserModule, AddressModule],
  exports: [ProviderRepositoryInMemory],
  providers: [ProvidersService, ProviderRepositoryInMemory],
})
export class ProviderModule {}
