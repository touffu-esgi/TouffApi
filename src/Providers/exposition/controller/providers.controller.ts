import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
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
import { UpdateProviderDto } from '../../dto/update-provider.dto';

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
    const providerId = await this.providersService.add(providerObject);
    return {
      url: HttpUtils.getFullUrlOf(request) + '/' + providerId,
    };
  }

  @Get()
  @HttpCode(200)
  async getAll(
    @Query() filters,
    @Req() request: Request,
  ): Promise<ProviderResponse[]> {
    const providers = await this.providersService.getAll(filters);
    return providers.map((provider) =>
      ProviderAdapter.fromProviderToProviderResponse(
        provider,
        HttpUtils.getBaseUrlOf(request),
      ),
    );
  }

  @Get(':providerId')
  @HttpCode(200)
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

  @Put(':providerId')
  @HttpCode(204)
  async update(
    @Param('providerId') providerId: string,
    @Body() updateProviderDto: UpdateProviderDto,
    @Req() request: Request,
  ) {
    await this.providersService.update(providerId, updateProviderDto);
  }
}
