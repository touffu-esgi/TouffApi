import { Animal } from './animal';

export interface AnimalRepository {
  save(animal: Animal): Animal;
  getAll(): Promise<Animal[]>;
}
