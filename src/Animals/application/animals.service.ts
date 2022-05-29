import { HttpException, Injectable } from '@nestjs/common';
import { AddAnimalDto } from '../dto/add-animal.dto';
import { Animal } from '../domain/animal';
import { AnimalRepositoryInMemory } from '../persistence/animal.repository.in-memory';
import { AnimalTypes } from '../domain/animal.types';
import { AnimalTypeNotAllowedException } from './exceptions/animal-type-not-allowed.exception';

@Injectable()
export class AnimalsService {
  constructor(private animalRepository: AnimalRepositoryInMemory) {}

  async add(dto: AddAnimalDto): Promise<void> {
    if (AnimalTypes[dto.type] == undefined)
      throw new AnimalTypeNotAllowedException(
        `animal type : '${dto.type}' is not allowed`,
      );

    const animal = new Animal(dto.name, AnimalTypes[dto.type]);
    this.animalRepository.save(animal);
  }

  getAll(): Promise<Animal[]> {
    return this.animalRepository.getAll();
  }
}
