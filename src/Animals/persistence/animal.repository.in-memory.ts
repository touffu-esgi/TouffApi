import { AnimalRepository } from '../domain/animal.repository';
import { Animal } from '../domain/animal';
import { AnimalTypes } from '../domain/animal.types';

export class AnimalRepositoryInMemory implements AnimalRepository {
  private readonly animals: Animal[] = [
    new Animal('roucky', AnimalTypes.chien, '1', '1'),
    new Animal('sirius', AnimalTypes.chat, '2', '1'),
    new Animal('lili', AnimalTypes.dromadaire, '3', '1'),
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

  getAllByRecipientId(recipientId: string) {
    const Animals = this.animals.filter((p) => p.recipientId === recipientId);
    if (Animals.length > 0) return Animals;
  }

  async getOne(animalId: string): Promise<Animal> {
    const animal = this.animals.filter((p) => p.id === animalId);
    if (animal.length > 0) return animal[0];
  }
}
