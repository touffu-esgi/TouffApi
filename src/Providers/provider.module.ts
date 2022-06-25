import { Module } from '@nestjs/common';
import { ProvidersController } from './exposition/controller/providers.controller';
import { ProvidersService } from './application/providers.service';
import { AddressService } from '../Address/application/address.service';
import { AddressRepositoryMongoose } from '../Address/persistance/mongoose-address-repository/address.repository.mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from '../Address/persistance/mongoose-address-repository/address.schema';
import { ProviderSchema } from './persistence/mongoose-provider-repository/provider.schema';
import { ProviderRepositoryMongoose } from './persistence/mongoose-provider-repository/provider.repository.mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }, { name: 'Providers', schema: ProviderSchema }]),

  ],
  controllers: [ProvidersController],
  providers: [
    ProvidersService,
    ProviderRepositoryMongoose,
    AddressService,
    AddressRepositoryMongoose,
  ],
})
export class ProviderModule {}
