import { AnimalTypes } from '../../domain/animal.types';
import { AnimalTypeNotAllowedException } from './animal-type-not-allowed.exception';

export class AnimalTypeFactory {
  static fromString(str: string): AnimalTypes | never {
    const type = AnimalTypes[str];
    if (!type)
      throw new AnimalTypeNotAllowedException(`Animal type ${str} unknown.`);
    return type;
  }
}
