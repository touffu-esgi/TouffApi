import { Module } from '@nestjs/common';
import { ProvidersController } from './exposition/controller/providers.controller';
import { ProvidersService } from './application/providers.service';
import { ProviderRepositoryInMemory } from './persistence/provider.repository.in-memory';
import { AddressService } from '../Address/application/address.service';
import { AddressRepositoryMongoose } from '../Address/persistance/mongoose-address-repository/address.repository.mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from '../Address/persistance/mongoose-address-repository/address.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),
  ],
  controllers: [ProvidersController],
  providers: [
    ProvidersService,
    ProviderRepositoryInMemory,
    AddressService,
    AddressRepositoryMongoose,
  ],
})
export class ProviderModule {}
