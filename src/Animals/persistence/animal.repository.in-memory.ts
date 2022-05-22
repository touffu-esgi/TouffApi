import { AnimalRepository } from '../domain/animal.repository';
import { Animal } from '../domain/animal';
import { AnimalTypes } from '../domain/animal.types';

export class AnimalRepositoryInMemory implements AnimalRepository {
  private readonly animals: Animal[] = [
    new Animal('roucky', AnimalTypes.chien),
    new Animal('sirius', AnimalTypes.chat),
    new Animal('lili', AnimalTypes.chat),
  ];
  save(animal: Animal): Animal {
    this.animals.push(animal);
    return animal;
  }

  async getAll(): Promise<Animal[]> {
    return this.animals;
  }
}
