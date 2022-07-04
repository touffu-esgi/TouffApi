import { Animal } from './animal';
import { AnimalProps } from '../persistence/mongoose-animal-repository/animal.schema';

export interface AnimalRepository {
  save(animal: AnimalProps): Promise<Animal>;
  getAll(): Promise<Animal[]>;
  getOne(animalId: string): Promise<Animal>;
}
