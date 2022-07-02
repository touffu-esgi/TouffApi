import { BillService } from '../../application/bill.service';
import { Request } from 'express';
import { BillResponse } from '../../domain/bill.response';
import { BillAdapter } from '../../adapters/bill.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';
import { BillExceptionFilter } from '../filters/bill.exception.filter';
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
import { AddBillDto } from '../../dto/add-bill.dto';
import { Bill } from '../../domain/bill';
import { AddAllBillsDto } from '../../dto/add-all-bills.dto';

@Controller('bill')
@UseFilters(new BillExceptionFilter())
export class BillController {
  constructor(private billService: BillService) {}

  @Post()
  @HttpCode(201)
  async addBill(@Body() dto: AddBillDto): Promise<BillResponse> {
    const bill = await this.billService.add(dto);
    return BillAdapter.toBillResponse(bill);
  }

  @Post('all')
  @HttpCode(201)
  async addAll(@Body() dto: AddAllBillsDto): Promise<BillResponse[]> {
    const bills = await this.billService.addAll(dto);
    return bills.map((bill) => BillAdapter.toBillResponse(bill));
  }

  @Get()
  async getAll(@Query() filters): Promise<BillResponse[]> {
    const bills = await this.billService.getAll(filters);
    return bills.map((bill) => BillAdapter.toBillResponse(bill));
  }
}
