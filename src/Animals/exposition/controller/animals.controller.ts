import { Body, Controller, HttpCode, Post, Req, UseFilters } from "@nestjs/common";
import { Request } from 'express';
import { AddAnimalDto } from '../../dto/add-animal.dto';
import { AnimalsService } from '../../application/animals.service';
import { HttpUtils } from '../../../shared/http/http.utils';
import { AnimalExceptionFilter } from "../filters/animal-exception.filter";

@Controller('animals')
export class AnimalsController {
  constructor(private readonly  animalsService: AnimalsService) {}

  @Post()
  @HttpCode(201)
  @UseFilters(new AnimalExceptionFilter())
  async add(
    @Body() addAnimalDto: AddAnimalDto,
    @Req() request: Request,
  ): Promise<{url: string}> {
    await this.animalsService.add(addAnimalDto);
    return {
      url: HttpUtils.getFullUrlOf(request) + '/' + addAnimalDto.name,
    };
  }
}
