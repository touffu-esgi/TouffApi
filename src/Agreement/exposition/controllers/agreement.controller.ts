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
import { AgreementExceptionFilter } from '../filters/agreement-exception.filter';
import { AgreementService } from '../../application/agreement.service';
import { Request } from 'express';
import { AgreementResponse } from '../../domain/agreement.response';
import { AgreementAdapter } from '../../adapters/agreement.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';
import { AddAgreementDto } from '../../dto/add-agreement.dto';
import { UpdateAgreementDto } from '../../dto/update-agreement-dto';

@Controller('agreement')
@UseFilters(new AgreementExceptionFilter())
export class AgreementController {
  constructor(private readonly agreementService: AgreementService) {}

  @Get()
  async getAll(
    @Req() req: Request,
    @Query() filters,
  ): Promise<AgreementResponse[]> {
    const agreements = await this.agreementService.getAll(filters);
    return agreements.map((agreement) =>
      AgreementAdapter.toAgreementResponse(
        agreement,
        HttpUtils.getBaseUrlOf(req),
      ),
    );
  }

  @Get(':agreementId')
  async getOne(
    @Param('agreementId') agreementId: string,
    @Req() req: Request,
  ): Promise<AgreementResponse> {
    const agreement = await this.agreementService.getOne(agreementId);
    return AgreementAdapter.toAgreementResponse(
      agreement,
      HttpUtils.getBaseUrlOf(req),
    );
  }

  @Post()
  @HttpCode(201)
  async add(
    @Body() addAgreementDto: AddAgreementDto,
    @Req() req: Request,
  ): Promise<{ url: string }> {
    const agreement = await this.agreementService.add(addAgreementDto);
    return {
      url: HttpUtils.getFullUrlOf(req) + '/' + agreement.id,
    };
  }

  @Put()
  @HttpCode(204)
  async update(
    @Body() updateAgreementDto: UpdateAgreementDto,
    @Req() req: Request,
  ): Promise<void> {
    const agreement = await this.agreementService.update(updateAgreementDto);
  }
}
