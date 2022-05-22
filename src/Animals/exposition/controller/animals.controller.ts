import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { Request } from 'express';
import { AddAnimalDto } from '../../dto/add-animal.dto';
import { AnimalsService } from '../../application/animals.service';
import { HttpUtils } from '../../../shared/http/http.utils';
import { AnimalExceptionFilter } from '../filters/animal-exception.filter';

class AnimalResponse {
  constructor(name) {
    this.name = name;
  }
  name: string;
}

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
    await this.animalsService.add(addAnimalDto);
    return {
      url: HttpUtils.getFullUrlOf(request) + '/' + addAnimalDto.name,
    };
  }

  @Get()
  async getAll(@Req() request: Request): Promise<AnimalResponse[]> {
    const animals = await this.animalsService.getAll();
    return animals.map((animal) => new AnimalResponse(animal.name));
  }
}
