import { Injectable } from '@nestjs/common';
import { AddAnimalDto } from '../dto/add-animal.dto';

@Injectable()
export class AnimalsService {
  async add(dto: AddAnimalDto) {
    return;
  }
}
