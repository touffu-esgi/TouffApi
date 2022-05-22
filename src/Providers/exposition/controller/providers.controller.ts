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
import { HttpUtils } from '../../../shared/http/http.utils';
import { ProvidersService } from '../../application/providers.service';
import { AddProviderDto } from '../../dto/add-provider.dto';
import { ProviderAdapter } from '../../adapters/provider.adapter';
import { ProviderResponse } from '../../domain/provider.response';
import { ProviderExceptionFilter } from '../filters/provider.exception.filter';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @HttpCode(201)
  @UseFilters(new ProviderExceptionFilter())
  async add(
    @Body() providerDto: AddProviderDto,
    @Req() request: Request,
  ): Promise<{ url: string }> {
    await this.providersService.add(providerDto);
    return {
      url: HttpUtils.getFullUrlOf(request) + '/' + providerDto.name,
    };
  }

  @Get()
  async getAll(@Req() request: Request): Promise<ProviderResponse[]> {
    const providers = await this.providersService.getAll();
    return providers.map((provider) => ProviderAdapter.fromDto(provider));
  }
}
