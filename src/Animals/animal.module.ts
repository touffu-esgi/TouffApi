import { AnimalsController } from './exposition/controller/animals.controller';
import { AnimalsService } from './application/animals.service';
import { Module } from '@nestjs/common';
import { AnimalRepositoryInMemory } from './persistence/animal.repository.in-memory';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService, AnimalRepositoryInMemory],
})
export class AnimalsModule {}
