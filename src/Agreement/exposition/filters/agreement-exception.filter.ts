import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AgreementNotFoundException } from '../../application/exceptions/agreement-not-found.exception';
import { ProviderBusyException } from '../../application/exceptions/provider-busy.exception';
import { NoCurrentAgreementException } from '../../application/exceptions/no-current-agreement.exception';

export class AgreementExceptionFilter implements ExceptionFilter {
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
      case AgreementNotFoundException.name:
        body.statusCode = 404;
        break;
      case ProviderBusyException.name:
        body.statusCode = 412;
        break;
      case NoCurrentAgreementException.name:
        body.statusCode = 201;
        break;
      default:
        body.statusCode = 500;
        break;
    }

    response.status(body.statusCode).json(body);
  }
}
