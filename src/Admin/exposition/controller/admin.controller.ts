import { AdminService } from '../../application/admin.service';
import { Request } from 'express';
import { AdminResponse } from '../../domain/admin.response';
import { AdminAdapter } from '../../adapters/admin.adapter';
import { HttpUtils } from '../../../shared/http/http.utils';
import { AdminExceptionFilter } from '../filters/admin.exception.filter';
import { Controller, Get, Param, Query, Req, UseFilters } from '@nestjs/common';

@Controller('admin')
@UseFilters(new AdminExceptionFilter())
export class AdminController {
  constructor(private adminService: AdminService) {}
}
