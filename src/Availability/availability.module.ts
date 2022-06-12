import { Module } from '@nestjs/common';
import { AvailabilityService } from './application/availability.service';
import { AvailabilityRepositoryInMemory } from './persistence/availability.repository.in-memory';
import { AvailabilityController } from './exposition/controller/availability.controller';
@Module({
  controllers: [AvailabilityController],
  providers: [AvailabilityService, AvailabilityRepositoryInMemory],
})
export class AvailabilityModule {}
