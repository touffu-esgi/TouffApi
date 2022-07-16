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
import { AddressService } from '../../application/address.service';
import { Request } from 'express';
import { AddressResponse } from '../../domain/address.response';
import { AddressAdapter } from '../../adapters/address.adapter';
import { AddressExceptionFilter } from '../filters/address-exception.filter';
import { HttpUtils } from '../../../shared/http/http.utils';
import { AddAddressDto } from '../../dto/add-address.dto';
import { UpdateAddressDto } from '../../dto/update-address.dto';

@Controller('address')
@UseFilters(new AddressExceptionFilter())
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @HttpCode(200)
  async getAll(
    @Req() req: Request,
    @Query() filters,
  ): Promise<AddressResponse[]> {
    const addresses = await this.addressService.getAll(filters);
    return addresses.map((address) =>
      AddressAdapter.fromAddressToAddressResponse(address),
    );
  }

  @Get(':addressId')
  @HttpCode(200)
  async getOne(
    @Param('addressId') addressId: string,
  ): Promise<AddressResponse> {
    const address = await this.addressService.getOne(addressId);
    return AddressAdapter.fromAddressToAddressResponse(address);
  }

  @Post()
  @HttpCode(201)
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

  @Put(':addressId')
  @HttpCode(204)
  async update(
    @Body() updateAddressDto: UpdateAddressDto,
    @Param('addressId') addressId: string,
    @Req() request: Request,
  ) {
    await this.addressService.update(addressId, updateAddressDto);
  }
}
