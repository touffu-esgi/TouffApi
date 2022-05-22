import { AddAnimalDto } from '../dto/add-animal.dto';
import { AnimalResponse } from '../domain/animal.response';

export class AnimalAdapter {
  public static fromDto(dto: AddAnimalDto) {
    return new AnimalResponse(dto.name, dto.type);
  }
}
