import { Injectable } from '@nestjs/common';
import { AddAnimalDto } from '../dto/add-animal.dto';
import { Animal } from '../domain/animal';
import { AnimalRepositoryInMemory } from '../persistence/animal.repository.in-memory';
import { AnimalTypeFactory } from './exceptions/animal-type.factory';

@Injectable()
export class AnimalsService {
  constructor(private animalRepository: AnimalRepositoryInMemory) {}

  async add(dto: AddAnimalDto): Promise<Animal> {
    const animalType = AnimalTypeFactory.fromString(dto.type);
    const nextId = await this.animalRepository.getNextId();

    const animal = new Animal(dto.name, animalType, nextId, dto.recipientId);

    await this.animalRepository.save(animal);
    return animal;
  }

  getAll(): Promise<Animal[]> {
    return this.animalRepository.getAll();
  }

  async getAllByRecipientId(recipientId: string) {
    return this.animalRepository.getAllByRecipientId(recipientId);
  }

  async getOne(animalId: string): Promise<Animal> {
    return this.animalRepository.getOne(animalId);
  }
}
