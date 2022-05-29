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
    const animals = await this.getAll();
    const constLastAnimal = +animals.at(-1).id;
    animal.id = (constLastAnimal + 1).toString();
    this.animals.push(animal);
    return animal;
  }

  async getAll(): Promise<Animal[]> {
    return this.animals;
  }
}
