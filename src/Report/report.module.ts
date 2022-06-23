import { Module } from '@nestjs/common';
import { ReportController } from './exposition/controller/report.controller';
import { ReportRepositoryInMemory } from './persistence/report.repository.in-memory';
import { ReportService } from './application/report.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, ReportRepositoryInMemory],
})
export class ReportModule {}
