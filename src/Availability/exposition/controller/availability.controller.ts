import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AvailabilityService } from '../../application/availability.service';
import { Request } from 'express';
import { Availability } from '../../domain/availability';
import { AvailabilityAdapter } from '../../adapters/availability.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';

@Controller('availability')
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @Get(':weekday/:providerId')
  async getDailyAvailability(
    @Param('providerId') providerId: string,
    @Param('weekday') weekday: string,
    @Req() req: Request,
  ) {
    const dailyAvailability =
      await this.availabilityService.getDailyAvailability(providerId, weekday);
    return AvailabilityAdapter.toAvailabilityResponse(
      dailyAvailability,
      HttpUtils.getBaseUrlOf(req),
    );
  }

  @Get(':providerId')
  async getWeeklyAvailability(
    @Param('providerId') providerId: string,
    @Req() req: Request,
    @Body() filter: { dateFrom: string },
  ) {
    const baseUrl = HttpUtils.getBaseUrlOf(req);
    const weeklyAvailability: Availability[] =
      await this.availabilityService.getWeeklyAvailability(
        providerId,
        filter.dateFrom,
      );
    return weeklyAvailability.map((availability) =>
      AvailabilityAdapter.toAvailabilityResponse(availability, baseUrl),
    );
  }
}
