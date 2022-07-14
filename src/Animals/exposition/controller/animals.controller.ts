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

  @Get()
  async getAll(@Req() request: Request): Promise<AnimalResponse[]> {
    const animals = await this.animalsService.getAll();
    return animals.map((animal) => AnimalAdapter.toAnimalResponse(animal));
  }

  @Get(':providerId')
  async getAllByProviderId(
    @Param('providerId') providerId: string,
    @Req() request: Request,
  ): Promise<AnimalResponse[]> {
    const animals = await this.animalsService.getAllByRecipientId(providerId);
    return animals.map((animal) => AnimalAdapter.toAnimalResponse(animal));
  }
}
