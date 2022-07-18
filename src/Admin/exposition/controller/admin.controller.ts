import { AdminService } from '../../application/admin.service';
import { Request } from 'express';
import { AdminResponse } from '../../domain/admin.response';
import { AdminAdapter } from '../../adapters/admin.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';
import { AdminExceptionFilter } from '../filters/admin.exception.filter';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  UseFilters,
} from '@nestjs/common';
import { AddressResponse } from '../../../Address/domain/address.response';
import { AddressAdapter } from '../../../Address/adapters/address.adapter';
import { AddAddressDto } from '../../../Address/dto/add-address.dto';
import { AddAdminDto } from '../../dto/add-admin.dto';
import { GetAdminDto } from '../../dto/get-admin.dto';
import { Admin } from '../../domain/admin';

@Controller('admin')
@UseFilters(new AdminExceptionFilter())
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get(':adminId')
  @HttpCode(200)
  async getOne(@Param('adminId') adminId: string): Promise<AdminResponse> {
    const admin = await this.adminService.getOne(adminId);
    return AdminAdapter.toAdminResponse(admin);
  }

  @Post('/login')
  @HttpCode(201)
  async getByEmailAndPassword(
    @Body() getAdminDto: GetAdminDto,
    @Req() request: Request,
  ): Promise<AdminResponse> {
    const admin = await this.adminService.getByEmailAndPassword(getAdminDto);
    return AdminAdapter.toAdminResponse(admin);
  }

  @Post()
  @HttpCode(201)
  async add(
    @Body() addAdminDto: AddAdminDto,
    @Req() request: Request,
  ): Promise<{ url: string }> {
    const admin = await this.adminService.add(addAdminDto);
    return {
      url: HttpUtils.getFullUrlOf(request) + '/' + admin.id,
    };
  }
}
