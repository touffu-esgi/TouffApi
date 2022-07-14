import { Module } from '@nestjs/common';
import { AgreementController } from './exposition/controllers/agreement.controller';
import { AgreementRepositoryInMemory } from './persistence/agreement.repository.in-memory';
import { AgreementService } from './application/agreement.service';
import { AvailabilityRepositoryInMemory } from '../Availability/persistence/availability.repository.in-memory';
import { UserRepositoryInMemory } from '../Users/persistence/user.repository.in-memory';
import { ProviderRepositoryInMemory } from '../Providers/persistence/provider.repository.in-memory';
import { RecipientRepositoryInMemory } from '../Recipients/persistence/recipient.repository.in-memory';

@Module({
  imports: [
    UserRepositoryInMemory,
    ProviderRepositoryInMemory,
    RecipientRepositoryInMemory,
  ],
  controllers: [AgreementController],
  providers: [
    AgreementService,
    AgreementRepositoryInMemory,
    AvailabilityRepositoryInMemory,
    UserRepositoryInMemory,
    ProviderRepositoryInMemory,
    RecipientRepositoryInMemory,
  ],
})
export class AgreementModule {}
