import { Injectable } from '@nestjs/common';
import { AddAnimalDto } from '../dto/add-animal.dto';
import { Animal } from '../domain/animal';
import { AnimalTypeFactory } from './exceptions/animal-type.factory';
import { AnimalProps } from '../persistence/mongoose-animal-repository/animal.schema';
import { AnimalRepositoryMongoose } from '../persistence/mongoose-animal-repository/animal.repository.mongoose';

@Injectable()
export class AnimalsService {
  constructor(private animalRepository: AnimalRepositoryMongoose) {}

  async add(dto: AddAnimalDto): Promise<Animal> {
    const animalType = AnimalTypeFactory.fromString(dto.type);
    const animalProps: AnimalProps = { name: dto.name, type: animalType };
    return await this.animalRepository.save(animalProps);
  }

  getAll(): Promise<Animal[]> {
    return this.animalRepository.getAll();
  }
}
