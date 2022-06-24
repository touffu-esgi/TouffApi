import { AnimalRepository } from '../../domain/animal.repository';
import { Animal } from '../../domain/animal';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnimalDocument, AnimalProps } from './animal.schema';

export class AnimalRepositoryMongoose implements AnimalRepository {
  constructor(
    @InjectModel('Animals') private animalModel: Model<AnimalDocument>,
  ) {}

  getAll(): Promise<Animal[]> {
    return Promise.resolve([]);
  }

  async save(animal: AnimalProps): Promise<Animal> {
    const newAnimal: AnimalDocument = await this.animalModel.create(animal);
    return new Animal(newAnimal.name, newAnimal.type, newAnimal._id);
  }

  getOne(animalId: string): Promise<Animal> {
    return Promise.resolve(undefined);
  }
}
