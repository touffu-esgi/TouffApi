import { Animal } from './animal';

export interface AnimalRepository {
  save(animal: Animal): Promise<Animal>;
  getAll(): Promise<Animal[]>;
  getOne(animalId: string): Promise<Animal>;
}
