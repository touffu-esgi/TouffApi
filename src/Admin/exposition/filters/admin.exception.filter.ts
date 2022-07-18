import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AdminNotFoundException } from '../../application/exceptions/admin-not-found.exception';

@Catch()
export class AdminExceptionFilter implements ExceptionFilter {
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
      case AdminNotFoundException.name:
        body.statusCode = 404;
        break;
      default:
        body.statusCode = 500;
        break;
    }

    response.status(body.statusCode).json(body);
  }
}
