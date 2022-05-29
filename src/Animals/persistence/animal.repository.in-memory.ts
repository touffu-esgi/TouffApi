import { AnimalRepository } from '../domain/animal.repository';
import { Animal } from '../domain/animal';
import { AnimalTypes } from '../domain/animal.types';

export class AnimalRepositoryInMemory implements AnimalRepository {
  private readonly animals: Animal[] = [
    new Animal('roucky', AnimalTypes.dog, '1'),
    new Animal('sirius', AnimalTypes.cat, '2'),
    new Animal('lili', AnimalTypes.cat, '3'),
  ];
  async save(animal: Animal): Promise<Animal> {
    this.animals.push(animal);
    return animal;
  }

  async getNextId(): Promise<string> {
    const constLastAnimal = +this.animals.at(-1).id;
    return (constLastAnimal + 1).toString();
  }

  async getAll(): Promise<Animal[]> {
    return this.animals;
  }
}
