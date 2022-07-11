import { Module } from '@nestjs/common';
import { PositionRepositoryInMemory } from './persistence/position.repository.in-memory';
import { PositionService } from './application/position.service';
import { PositionController } from './exposition/controller/position.controller';
@Module({
  controllers: [PositionController],
  providers: [PositionService, PositionRepositoryInMemory],
})
export class PositionModule {}
