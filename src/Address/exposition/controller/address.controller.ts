import { Controller, Get, HttpCode, Req } from '@nestjs/common';
import { AddressService } from '../../application/address.service';
import { Request } from 'express';
import { AddressResponse } from '../../domain/address.response';
import { AddressAdapter } from '../../adapters/address.adapter';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @HttpCode(200)
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
}
