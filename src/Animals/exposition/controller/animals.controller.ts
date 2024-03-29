import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { AddAnimalDto } from '../../dto/add-animal.dto';
import { AnimalsService } from '../../application/animals.service';
import { HttpUtils } from '../../../shared/http/http.utils';
import { AnimalExceptionFilter } from '../filters/animal-exception.filter';
import { AnimalResponse } from '../../domain/animal.response';
import { AnimalAdapter } from '../../adapters/animal.adapter';
import { AnimalTypes } from '../../domain/animal.types';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  @HttpCode(201)
  @UseFilters(new AnimalExceptionFilter())
  async add(
    @Body() addAnimalDto: AddAnimalDto,
    @Req() request: Request,
  ): Promise<{ url: string }> {
    const newAnimal = await this.animalsService.add(addAnimalDto);
    return {
      url: HttpUtils.getFullUrlOf(request) + '/' + newAnimal.id,
    };
  }

  @Get('/animalType')
  async getAnimalType(@Req() request: Request): Promise<string[]> {
    return Object.keys(AnimalTypes);
  }

  @Get()
  async getAll(@Req() request: Request): Promise<AnimalResponse[]> {
    const animals = await this.animalsService.getAll();
    return animals.map((animal) => AnimalAdapter.toAnimalResponse(animal));
  }

  @Get('/recipient/:recipientId')
  async getAllByProviderId(
    @Param('recipientId') recipientId: string,
    @Req() request: Request,
  ): Promise<AnimalResponse[]> {
    const animals = await this.animalsService.getAllByRecipientId(recipientId);
    return animals.map((animal) => AnimalAdapter.toAnimalResponse(animal));
  }

  @Get(':animalId')
  async getOne(
    @Param('animalId') animalId: string,
    @Req() request: Request,
  ): Promise<AnimalResponse> {
    const animal = await this.animalsService.getOne(animalId);
    return AnimalAdapter.toAnimalResponse(animal);
  }
}
