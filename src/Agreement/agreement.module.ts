import { Module } from '@nestjs/common';
import { AgreementController } from './exposition/controllers/agreement.controller';
import { AgreementRepositoryInMemory } from './persistence/agreement.repository.in-memory';
import { AgreementService } from './application/agreement.service';
import { AvailabilityRepositoryInMemory } from '../Availability/persistence/availability.repository.in-memory';
import { MessageService } from '../Message/application/message.service';
import { MessageRepositoryInMemory } from '../Message/persistance/message.repository.in-memory';
import { UserRepositoryInMemory } from '../Users/persistence/user.repository.in-memory';
import { ProviderRepositoryInMemory } from '../Providers/persistence/provider.repository.in-memory';
import { RecipientRepositoryInMemory } from '../Recipients/persistence/recipient.repository.in-memory';
import { UserModule } from '../Users/user.module';
import { ProviderModule } from '../Providers/provider.module';
import { RecipientsModule } from '../Recipients/recipient.module';

@Module({
  imports: [UserModule, ProviderModule, RecipientsModule],
  controllers: [AgreementController],
  exports: [AgreementRepositoryInMemory],
  providers: [
    AgreementService,
    AgreementRepositoryInMemory,
    AvailabilityRepositoryInMemory,
  ],
})
export class AgreementModule {}
