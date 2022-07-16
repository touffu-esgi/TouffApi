import { Controller, Get, Query } from '@nestjs/common';
@Controller('health')
export class HealthController {
  constructor() {}

  @Get()
  async isAlive(@Query() filters): Promise<boolean> {
    return true;
  }
}
