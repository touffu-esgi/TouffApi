import { Module } from '@nestjs/common';
import { AddressRepositoryInMemory } from './persistance/address.repository.in-memory';
import { AddressService } from './application/address.service';
import { AddressController } from './exposition/controller/address.controller';

@Module({
  controllers: [AddressController],
  exports: [AddressRepositoryInMemory, AddressService],
  providers: [AddressService, AddressRepositoryInMemory],
})
export class AddressModule {}
