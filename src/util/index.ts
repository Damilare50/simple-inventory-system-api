import { HttpStatus } from '@nestjs/common';

export class ResponseDto<T> {
  message: string;
  data: T;
  statusCode: HttpStatus;
}
