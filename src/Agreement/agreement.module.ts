import { Module } from '@nestjs/common';
import { AgreementController } from './exposition/controllers/agreement.controller';
import { AgreementRepositoryInMemory } from './persistence/agreement.repository.in-memory';
import { AgreementService } from './application/agreement.service';

@Module({
  controllers: [AgreementController],
  providers: [AgreementService, AgreementRepositoryInMemory],
})
export class AgreementModule {}
