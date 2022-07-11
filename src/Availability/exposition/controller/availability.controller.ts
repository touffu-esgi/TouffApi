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
import { AvailabilityService } from '../../application/availability.service';
import { Request } from 'express';
import { Availability } from '../../domain/availability';
import { AvailabilityAdapter } from '../../adapters/availability.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';
import { AvailabilityResponse } from '../../domain/availability.response';
import { AddAvailabilityDto } from '../../dto/add-availability.dto';
import { AvailabilityExceptionFilter } from '../filters/availabilityExceptionFilter';

@Controller('availability')
@UseFilters(new AvailabilityExceptionFilter())
export class AvailabilityController {
  constructor(private availabilityService: AvailabilityService) {}

  @Post()
  @HttpCode(201)
  async add(
    @Body() addAvailabilityDto: AddAvailabilityDto,
    @Req() req: Request,
  ): Promise<{ url: string }> {
    const availability = await this.availabilityService.add(addAvailabilityDto);
    return {
      url: HttpUtils.getFullUrlOf(req) + '/' + availability.id,
    };
  }

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
    @Query() filters,
  ): Promise<AvailabilityResponse[]> {
    const baseUrl = HttpUtils.getBaseUrlOf(req);
    if (!filters.dateFrom) filters.dateFrom = null;
    const weeklyAvailability: Availability[] =
      await this.availabilityService.getWeeklyAvailability(
        providerId,
        filters.dateFrom,
      );
    return weeklyAvailability.map((availability) =>
      AvailabilityAdapter.toAvailabilityResponse(availability, baseUrl),
    );
  }
}
