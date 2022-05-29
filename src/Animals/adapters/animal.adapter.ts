import { AnimalResponse } from '../domain/animal.response';
import { Animal } from '../domain/animal';

export class AnimalAdapter {
  public static toAnimalResponse(dto: Animal): AnimalResponse {
    return new AnimalResponse(dto.name, dto.type, dto.id);
  }
}
