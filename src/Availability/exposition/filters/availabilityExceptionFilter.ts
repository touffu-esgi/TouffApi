import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DayAlreadyExistException } from '../../application/exceptions/day-already-exist.exception';
import { NotAvailableException } from '../../application/exceptions/not-available.exception';

@Catch()
export class AvailabilityExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const body = {
      statusCode:
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      message: exception.message,
      path: request.url,
    };

    switch (exception.name) {
      case DayAlreadyExistException.name:
        body.statusCode = 400;
        break;
      case NotAvailableException.name:
        body.statusCode = 404;
        break;
    }

    response.status(body.statusCode).json(body);
  }
}
