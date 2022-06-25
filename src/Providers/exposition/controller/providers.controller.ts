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
import { HttpUtils } from '../../../shared/http/http.utils';
import { ProvidersService } from '../../application/providers.service';
import { AddProviderDto } from '../../dto/add-provider.dto';
import { ProviderAdapter } from '../../adapters/provider.adapter';
import { ProviderResponse } from '../../domain/provider.response';
import { ProviderExceptionFilter } from '../filters/provider.exception.filter';

@Controller('provider')
@UseFilters(new ProviderExceptionFilter())
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  @HttpCode(201)
  async add(
    @Body() providerDto: AddProviderDto,
    @Req() request: Request,
  ): Promise<{ url: string }> {
    const providerObject = ProviderAdapter.fromDtoToProvider(providerDto);
    const provider = await this.providersService.add(providerObject);
    return {
      url: HttpUtils.getFullUrlOf(request) + '/' + provider.id,
    };
  }

  @Get()
  async getAll(@Req() request: Request): Promise<ProviderResponse[]> {
    const providers = await this.providersService.getAll();
    return providers.map((provider) =>
      ProviderAdapter.fromProviderToProviderResponse(
        provider,
        HttpUtils.getBaseUrlOf(request),
      ),
    );
  }

  @Get(':providerId')
  async getOne(
    @Param('providerId') providerId: string,
    @Req() request: Request,
  ): Promise<ProviderResponse> {
    const provider = await this.providersService.getOne(providerId);
    return ProviderAdapter.fromProviderToProviderResponse(
      provider,
      HttpUtils.getBaseUrlOf(request),
    );
  }
}
