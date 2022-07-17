import { forwardRef, Module } from '@nestjs/common';
import { AvailabilityService } from './application/availability.service';
import { AvailabilityRepositoryInMemory } from './persistence/availability.repository.in-memory';
import { AvailabilityController } from './exposition/controller/availability.controller';
import { AgreementModule } from '../Agreement/agreement.module';

@Module({
  controllers: [AvailabilityController],
  imports: [forwardRef(() => AgreementModule)],
  exports: [AvailabilityRepositoryInMemory],
  providers: [AvailabilityService, AvailabilityRepositoryInMemory],
})
export class AvailabilityModule {}
