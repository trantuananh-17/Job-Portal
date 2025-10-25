import HttpStatus from './httpStatus';

export abstract class CustomError extends Error {
  abstract status: string;
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
  }
}

export class BadRequestException extends CustomError {
  status: string = 'error';
  statusCode: number = HttpStatus.BAD_REQUEST;

  constructor(message: string) {
    super(message);
  }
}

export class NotFoundException extends CustomError {
  status: string = 'error';
  statusCode: number = HttpStatus.NOT_FOUND;

  constructor(message: string) {
    super(message);
  }
}

export class UnauthorizedException extends CustomError {
  status: string = 'error';
  statusCode: number = HttpStatus.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
  }
}

export class ForbiddenException extends CustomError {
  status: string = 'error';
  statusCode: number = HttpStatus.FORBIDDEN;

  constructor(message: string) {
    super(message);
  }
}

export class ConflictException extends CustomError {
  status: string = 'error';
  statusCode: number = HttpStatus.CONFLICT;

  constructor(message: string) {
    super(message);
  }
}

export class InternalServerError extends CustomError {
  status: string = 'error';
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;

  constructor(message: string) {
    super(message);
  }
}
