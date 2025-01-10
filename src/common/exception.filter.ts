import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message || 'Internal server error';

    console.error('Error:', message);

    response.status(status).json({
      statusCode: status,
      message: message,
      path: request.url,
    });
  }
}
