import { Controller, Get, HttpCode, Req, UseFilters } from '@nestjs/common';
import { AgreementExceptionFilter } from '../../filters/agreement-exception.filter';
import { AgreementService } from '../../application/agreement.service';
import { Request } from 'express';
import { AgreementResponse } from '../../domain/agreement.response';
import { AgreementAdapter } from '../../adapters/agreement.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';

@Controller('agreement')
@UseFilters(new AgreementExceptionFilter())
export class AgreementController {
  constructor(private readonly agreementService: AgreementService) {}

  @Get()
  @HttpCode(200)
  async getAll(@Req() req: Request): Promise<AgreementResponse[]> {
    let filters = {};
    if (req.body.filter) {
      filters = req.body.filter;
    }
    const agreements = await this.agreementService.getAll(filters);
    return agreements.map((agreement) =>
      AgreementAdapter.toAgreementResponse(
        agreement,
        HttpUtils.getBaseUrlOf(req),
      ),
    );
  }
}
