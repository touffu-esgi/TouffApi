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

@Controller('bill')
@UseFilters(new BillExceptionFilter())
export class BillController {
  constructor(private billService: BillService) {}

  @Post()
  @HttpCode(201)
  async addBill(@Body() dto: AddBillDto): Promise<Bill> {
    const bill = this.billService.add(dto);
    return bill;
  }

  // @Post()
  // @HttpCode(201)
  // async addAll(@Body dto: AddBillDto): Promise<Bill> {
  //   const bill = this.billService.add(dto);
  //   return bill;
  // }
}
