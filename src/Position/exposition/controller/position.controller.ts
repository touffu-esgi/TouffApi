import { Controller, Get, Param, Query, Req, UseFilters } from '@nestjs/common';
import { PositionService } from '../../application/position.service';
import { Request } from 'express';
import { PositionResponse } from '../../domain/position.response';
import { PositionAdapter } from '../../adapters/position.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';
import { PositionExceptionFilter } from '../filters/position.exception.filter';

@Controller('position')
@UseFilters(new PositionExceptionFilter())
export class PositionController {
  constructor(private positionService: PositionService) {}

  @Get(':agreementId')
  async getLastByPosition(
    @Req() req: Request,
    @Param('agreementId') agreementId: string,
  ): Promise<PositionResponse> {
    const lastPosition = await this.positionService.getLastByAgreement(
      agreementId,
    );
    return PositionAdapter.toPositionResponse(
      lastPosition,
      HttpUtils.getBaseUrlOf(req),
    );
  }

  @Get('route/:agreementId')
  async getRoute(
    @Req() req: Request,
    @Query() query,
    @Param('agreementId') agreementId: string,
  ): Promise<PositionResponse[]> {
    if (!query.dateFrom || !query.dateTo)
      throw new Error('Missing params dateFrom/dateTo');
    const positions = await this.positionService.getRoute(
      agreementId,
      query.dateFrom,
      query.dateTo,
    );
    const baseUrl = HttpUtils.getBaseUrlOf(req);
    return positions.map((position) =>
      PositionAdapter.toPositionResponse(position, baseUrl),
    );
  }
}
