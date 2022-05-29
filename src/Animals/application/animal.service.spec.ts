import { AnimalsService } from './animals.service';
import { AnimalRepositoryInMemory } from '../persistence/animal.repository.in-memory';
import { Test, TestingModule } from '@nestjs/testing';
import { AddAnimalDto } from '../dto/add-animal.dto';
import { AnimalRepository } from '../domain/animal.repository';
import { Animal } from '../domain/animal';
import { AnimalTypes } from '../domain/animal.types';

describe('AnimalsService', () => {
  let animalsService: AnimalsService;
  let animals: Animal[] = [
    new Animal('roucky', AnimalTypes.chien),
    new Animal('sirius', AnimalTypes.chat),
    new Animal('lili', AnimalTypes.chat),
  ];

  const mockAnimalsRepository = {
    save: jest.fn().mockImplementation((animal) => {
      animals.push(animal);
    }),
    getAll: jest.fn().mockReturnValue(animals),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalsService, AnimalRepositoryInMemory],
    })
      .overrideProvider(AnimalRepositoryInMemory)
      .useValue(mockAnimalsRepository)
      .compile();

    animalsService = module.get<AnimalsService>(AnimalsService);
  });

  it('should create one animal', function () {
    const addAnimalDto: AddAnimalDto = {
      name: 'jean',
      type: AnimalTypes.chien,
    };

    animalsService.add(addAnimalDto);
    animals = mockAnimalsRepository.getAll();

    expect(animals.at(-1)).toEqual({
      _name: 'jean',
      _type: AnimalTypes.chien,
    });
  });

  it('should get all animals', async function () {
    animals = await animalsService.getAll();
    expect(animals.length).toEqual(4);
  });

  it('should throw an error of animal type', async function () {
    const addAnimalDto: AddAnimalDto = {
      name: 'jean',
      type: 'giraffe',
    };

    await expect(() => animalsService.add(addAnimalDto)).rejects.toThrow(
      'Animal type giraffe unknown.',
    );
  });
});
