import { Controller, Get, Param, Req } from '@nestjs/common';
import { AvailabilityService } from '../../application/availability.service';
import { Request } from 'express';
import { Availability } from '../../domain/availability';
import { AvailabilityAdapter } from '../../adapters/availability.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';

@Controller('availability')
export class AvailabilityController {
  private baseUrl;
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
  ) {
    const baseUrl = HttpUtils.getBaseUrlOf(req);
    const weeklyAvailability: Availability[] =
      await this.availabilityService.getWeeklyAvailability(providerId);
    return weeklyAvailability.map((availability) =>
      AvailabilityAdapter.toAvailabilityResponse(availability, baseUrl),
    );
  }
}
