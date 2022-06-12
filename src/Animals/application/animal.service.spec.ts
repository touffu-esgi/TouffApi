import { AnimalsService } from './animals.service';
import { AnimalRepositoryInMemory } from '../persistence/animal.repository.in-memory';
import { Test, TestingModule } from '@nestjs/testing';
import { AddAnimalDto } from '../dto/add-animal.dto';
import { Animal } from '../domain/animal';
import { AnimalTypes } from '../domain/animal.types';

describe('AnimalsService', () => {
  let animalsService: AnimalsService;
  let animals: Animal[] = [
    new Animal('roucky', AnimalTypes.dog, '1'),
    new Animal('sirius', AnimalTypes.cat, '2'),
    new Animal('lili', AnimalTypes.cat, '3'),
  ];

  const mockAnimalsRepository = {
    save: jest.fn().mockImplementation((animal) => {
      animals.push(animal);
    }),
    getAll: jest.fn().mockReturnValue(animals),
    getNextId: jest.fn().mockImplementation(() => {
      const constLastAnimal = mockAnimalsRepository.getAll();
      const nextId = +constLastAnimal.at(-1).id;
      return (nextId + 1).toString();
    }),
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

  it('should create one animal', async function () {
    const addAnimalDto: AddAnimalDto = {
      name: 'jean',
      type: AnimalTypes.dog,
    };

    const newAnimal = await animalsService.add(addAnimalDto);

    expect(newAnimal).toEqual({
      _name: 'jean',
      _type: AnimalTypes.dog,
      _id: '4',
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
