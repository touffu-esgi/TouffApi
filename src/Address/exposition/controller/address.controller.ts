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
import { AddressService } from '../../application/address.service';
import { Request } from 'express';
import { AddressResponse } from '../../domain/address.response';
import { AddressAdapter } from '../../adapters/address.adapter';
import { AddressExceptionFilter } from '../filters/address-exception.filter';
import { AddProviderDto } from '../../../Providers/dto/add-provider.dto';
import { HttpUtils } from '../../../shared/http/http.utils';
import { AddAddressDto } from '../../dto/add-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @HttpCode(200)
  @UseFilters(new AddressExceptionFilter())
  async getAll(@Req() req: Request): Promise<AddressResponse[]> {
    let filters = {};
    if (req.body.filter) {
      filters = req.body.filter;
    }
    const addresses = await this.addressService.getAll(filters);
    return addresses.map((address) =>
      AddressAdapter.fromAddressToAddressResponse(address),
    );
  }

  @Get(':addressId')
  @HttpCode(200)
  @UseFilters(new AddressExceptionFilter())
  async getOne(
    @Param('addressId') addressId: string,
  ): Promise<AddressResponse> {
    const address = await this.addressService.getOne(addressId);
    return AddressAdapter.fromAddressToAddressResponse(address);
  }

  @Post()
  @HttpCode(201)
  @UseFilters(new AddressExceptionFilter())
  async add(
    @Body() addAddressDto: AddAddressDto,
    @Req() request: Request,
  ): Promise<{ url: string }> {
    const addressClass = AddressAdapter.fromDtoToAddress(addAddressDto);
    const address = await this.addressService.add(addressClass);
    return {
      url: HttpUtils.getFullUrlOf(request) + '/' + address.id,
    };
  }
}
