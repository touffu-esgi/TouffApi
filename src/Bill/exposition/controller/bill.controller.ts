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
  Put,
  Query,
  Req,
  UseFilters,
} from '@nestjs/common';
import { AddBillDto } from '../../dto/add-bill.dto';
import { Bill } from '../../domain/bill';
import { AddAllBillsDto } from '../../dto/add-all-bills.dto';
import { UpdateBillDto } from '../../dto/update-bill.dto';

@Controller('bill')
@UseFilters(new BillExceptionFilter())
export class BillController {
  constructor(private billService: BillService) {}

  @Post()
  @HttpCode(201)
  async addBill(
    @Body() dto: AddBillDto,
    @Req() req: Request,
  ): Promise<BillResponse> {
    const bill = await this.billService.add(dto);
    return BillAdapter.toBillResponse(bill, HttpUtils.getBaseUrlOf(req));
  }

  @Post('all')
  @HttpCode(201)
  async addAll(
    @Body() dto: AddAllBillsDto,
    @Req() req: Request,
  ): Promise<BillResponse[]> {
    const bills = await this.billService.addAll(dto);
    return bills.map((bill) =>
      BillAdapter.toBillResponse(bill, HttpUtils.getBaseUrlOf(req)),
    );
  }

  @Get()
  async getAll(@Query() filters, @Req() req: Request): Promise<BillResponse[]> {
    const bills = await this.billService.getAll(filters);
    return bills.map((bill) =>
      BillAdapter.toBillResponse(bill, HttpUtils.getBaseUrlOf(req)),
    );
  }

  @Put()
  @HttpCode(204)
  async updateBill(@Body() dto: UpdateBillDto, @Req() req: Request) {
    await this.billService.updateOne(dto);
  }
}
