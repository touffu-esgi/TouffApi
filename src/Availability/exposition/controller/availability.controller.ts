import { Body, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { AvailabilityService } from '../../application/availability.service';
import { Request } from 'express';
import { Availability } from '../../domain/availability';
import { AvailabilityAdapter } from '../../adapters/availability.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';
import { AvailabilityResponse } from '../../domain/availability.response';

@Controller('availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @Get(':weekday/:providerId')
  async getDailyAvailability(
    @Param('providerId') providerId: string,
    @Param('weekday') weekday: string,
    @Req() req: Request,
  ): Promise<AvailabilityResponse> {
    const dailyAvailability =
      await this.availabilityService.getDefaultDailyAvailability(
        providerId,
        weekday,
      );
    return AvailabilityAdapter.toAvailabilityResponse(
      dailyAvailability,
      HttpUtils.getBaseUrlOf(req),
    );
  }

  @Get(':providerId')
  async getWeeklyAvailability(
    @Param('providerId') providerId: string,
    @Req() req: Request,
    @Query() query,
  ): Promise<AvailabilityResponse[]> {
    const baseUrl = HttpUtils.getBaseUrlOf(req);
    const weeklyAvailability: Availability[] =
      await this.availabilityService.getWeeklyAvailability(
        providerId,
        query.dateFrom ? query.dateFrom : null,
      );
    return weeklyAvailability.map((availability) =>
      AvailabilityAdapter.toAvailabilityResponse(availability, baseUrl),
    );
  }
}
