import { Injectable } from '@nestjs/common';
import { AddAnimalDto } from '../dto/add-animal.dto';
import { Animal } from '../domain/animal';
import { AnimalRepositoryInMemory } from '../persistence/animal.repository.in-memory';

@Injectable()
export class AnimalsService {
  constructor(private animalRepository: AnimalRepositoryInMemory) {}

  async add(dto: AddAnimalDto): Promise<void> {
    const animal = new Animal(dto.name);
    this.animalRepository.save(animal);
  }

  getAll(): Promise<Animal[]> {
    return this.animalRepository.getAll();
  }
}
