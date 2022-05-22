import { AnimalsController } from './exposition/controller/animals.controller';
import { AnimalsService } from './application/animals.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
