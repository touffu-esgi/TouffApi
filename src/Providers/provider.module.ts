import { Module } from '@nestjs/common';
import { ProvidersController } from './exposition/controller/providers.controller';
import { ProvidersService } from './application/providers.service';
import { ProviderRepositoryInMemory } from './persistence/provider.repository.in-memory';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService, ProviderRepositoryInMemory],
})
export class ProviderModule {}
