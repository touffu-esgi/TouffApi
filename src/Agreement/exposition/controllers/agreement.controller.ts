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
import { UpdateAgreementDto } from '../../dto/update-agreement.dto';
import { Agreement } from '../../domain/agreement';

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
    console.log(agreements);
    return agreements.map((agreement) =>
      AgreementAdapter.toAgreementResponse(
        agreement,
        HttpUtils.getBaseUrlOf(req),
      ),
    );
  }

  @Get('datetime')
  async getAgreementAtDateTime(
    @Req() req: Request,
    @Query() filters,
  ): Promise<AgreementResponse> {
    let dt = new Date();
    if (filters.dt) {
      dt = new Date(filters.dt);
    }
    if (!filters.animal) {
      throw new Error("Pas d'animal");
    }
    const agreement = await this.agreementService.getOneFromAnimalAndDatetime(
      dt,
      filters.animal,
    );
    return AgreementAdapter.toAgreementResponse(
      agreement,
      HttpUtils.getBaseUrlOf(req),
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

  @Put(':agreementId')
  @HttpCode(204)
  async update(
    @Body() updateAgreementDto: UpdateAgreementDto,
    @Param('agreementId') agreementId: string,
    @Req() req: Request,
  ): Promise<void> {
    await this.agreementService.update(updateAgreementDto, agreementId);
  }
}
