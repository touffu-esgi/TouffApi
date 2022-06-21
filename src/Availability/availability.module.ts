import { Module } from '@nestjs/common';
import { AvailabilityService } from './application/availability.service';
import { AvailabilityRepositoryInMemory } from './persistence/availability.repository.in-memory';
import { AvailabilityController } from './exposition/controller/availability.controller';
import { AgreementRepositoryInMemory } from '../Agreement/persistence/agreement.repository.in-memory';

@Module({
  controllers: [AvailabilityController],
  providers: [
    AvailabilityService,
    AvailabilityRepositoryInMemory,
    AgreementRepositoryInMemory,
  ],
})
export class AvailabilityModule {}
