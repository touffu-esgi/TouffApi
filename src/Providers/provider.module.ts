import { Module } from '@nestjs/common';
import { ProvidersController } from './exposition/controller/providers.controller';
import { ProvidersService } from './application/providers.service';
import { AddressService } from '../Address/application/address.service';
import { AddressRepositoryInMemory } from '../Address/persistance/address.repository.in-memory';
import { MongooseModule } from '@nestjs/mongoose';
import { ProviderSchema } from './persistence/mongoose-provider-repository/provider.schema';
import { ProviderRepositoryMongoose } from './persistence/mongoose-provider-repository/provider.repository.mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Providers', schema: ProviderSchema }]),
  ],
  controllers: [ProvidersController],
  providers: [
    ProvidersService,
    ProviderRepositoryMongoose,
    AddressService,
    AddressRepositoryInMemory,
  ],
})
export class ProviderModule {}
