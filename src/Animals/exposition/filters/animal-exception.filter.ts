import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AnimalTypeNotAllowedException } from '../../application/exceptions/animal-type-not-allowed.exception';

@Catch()
export class AnimalExceptionFilter implements ExceptionFilter {
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
      case AnimalTypeNotAllowedException.name:
        body.statusCode = 400;
        break;
    }

    response.status(body.statusCode).json(body);
  }
}
