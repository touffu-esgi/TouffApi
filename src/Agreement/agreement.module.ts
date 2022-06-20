import { Module } from '@nestjs/common';
import { AgreementController } from './exposition/controllers/agreement.controller';
import { AgreementRepositoryInMemory } from './persistence/agreement.repository.in-memory';
import { AgreementService } from './application/agreement.service';
import { AvailabilityRepositoryInMemory } from '../Availability/persistence/availability.repository.in-memory';

@Module({
  controllers: [AgreementController],
  providers: [
    AgreementService,
    AgreementRepositoryInMemory,
    AvailabilityRepositoryInMemory,
  ],
})
export class AgreementModule {}
