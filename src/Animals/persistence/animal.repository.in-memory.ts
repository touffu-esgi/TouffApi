import { AnimalRepository } from '../domain/animal.repository';
import { Animal } from '../domain/animal';

export class AnimalRepositoryInMemory implements AnimalRepository {
  private readonly animals: Animal[] = [
    new Animal('roucky'),
    new Animal('sirius'),
    new Animal('lili'),
  ];
  save(animal: Animal): Animal {
    this.animals.push(animal);
    return animal;
  }

  async getAll(): Promise<Animal[]> {
    return this.animals;
  }
}
