import { HttpException, Injectable } from '@nestjs/common';
import { AddAnimalDto } from '../dto/add-animal.dto';
import { Animal } from '../domain/animal';
import { AnimalRepositoryInMemory } from '../persistence/animal.repository.in-memory';
import { AnimalTypes } from '../domain/animal.types';

@Injectable()
export class AnimalsService {
  constructor(private animalRepository: AnimalRepositoryInMemory) {}

  async add(dto: AddAnimalDto): Promise<void> {
    console.log(AnimalTypes[dto.type]);
    if (AnimalTypes[dto.type] == undefined)
      throw new HttpException('this type of animal is not allowed', 400);

    const animal = new Animal(dto.name, AnimalTypes[dto.type]);
    this.animalRepository.save(animal);
  }

  getAll(): Promise<Animal[]> {
    return this.animalRepository.getAll();
  }
}
