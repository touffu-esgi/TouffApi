import { Module } from '@nestjs/common';
import { AddressService } from './application/address.service';
import { AddressController } from './exposition/controller/address.controller';
import { AddressRepositoryMongoose } from './persistance/mongoose-address-repository/address.repository.mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressSchema } from './persistance/mongoose-address-repository/address.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Address', schema: AddressSchema }]),
  ],
  controllers: [AddressController],
  providers: [AddressService, AddressRepositoryMongoose],
})
export class AddressModule {}
