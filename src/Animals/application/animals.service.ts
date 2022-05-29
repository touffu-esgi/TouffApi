import { Injectable } from '@nestjs/common';
import { AddAnimalDto } from '../dto/add-animal.dto';
import { Animal } from '../domain/animal';
import { AnimalRepositoryInMemory } from '../persistence/animal.repository.in-memory';
import { AnimalTypeFactory } from './exceptions/animal-type.factory';

@Injectable()
export class AnimalsService {
  constructor(private animalRepository: AnimalRepositoryInMemory) {}

  async add(dto: AddAnimalDto): Promise<void> {
    const animalType = AnimalTypeFactory.fromString(dto.type);

    const animal = new Animal(dto.name, animalType);
    this.animalRepository.save(animal);
  }

  getAll(): Promise<Animal[]> {
    return this.animalRepository.getAll();
  }
}
