import { Controller, Get, Param, Req } from '@nestjs/common';
import { PositionService } from '../../application/position.service';
import { Request } from 'express';
import { PositionResponse } from '../../domain/position.response';
import { PositionAdapter } from '../../adapters/position.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';

@Controller('position')
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
}
