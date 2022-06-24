import { AnimalsController } from './exposition/controller/animals.controller';
import { AnimalsService } from './application/animals.service';
import { Module } from '@nestjs/common';
import { AnimalRepositoryMongoose } from './persistence/mongoose-animal-repository/animal.repository.mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalSchema } from './persistence/mongoose-animal-repository/animal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Animals', schema: AnimalSchema }]),
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService, AnimalRepositoryMongoose],
})
export class AnimalsModule {}
