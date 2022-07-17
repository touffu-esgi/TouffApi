import { Module } from '@nestjs/common';
import { AgreementController } from './exposition/controllers/agreement.controller';
import { AgreementRepositoryInMemory } from './persistence/agreement.repository.in-memory';
import { AgreementService } from './application/agreement.service';
import { AvailabilityRepositoryInMemory } from '../Availability/persistence/availability.repository.in-memory';
import { UserModule } from '../Users/user.module';
import { ProviderModule } from '../Providers/provider.module';
import { RecipientsModule } from '../Recipients/recipient.module';
import { AvailabilityModule } from '../Availability/availability.module';

@Module({
  imports: [UserModule, ProviderModule, RecipientsModule, AvailabilityModule],
  controllers: [AgreementController],
  exports: [AgreementRepositoryInMemory],
  providers: [AgreementService, AgreementRepositoryInMemory],
})
export class AgreementModule {}
