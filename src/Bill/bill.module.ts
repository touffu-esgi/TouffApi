import { Module } from '@nestjs/common';
import { BillRepositoryInMemory } from './persistence/bill.repository.in-memory';
import { BillService } from './application/bill.service';
import { BillController } from './exposition/controller/bill.controller';
import { AgreementRepositoryInMemory } from '../Agreement/persistence/agreement.repository.in-memory';
import { AgreementModule } from '../Agreement/agreement.module';
@Module({
  controllers: [BillController],
  imports: [AgreementModule],
  providers: [BillService, BillRepositoryInMemory, AgreementRepositoryInMemory],
})
export class BillModule {}
