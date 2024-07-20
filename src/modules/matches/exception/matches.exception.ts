import { HttpException, HttpStatus } from '@nestjs/common';

export class MatchNotFoundException extends HttpException {
  constructor() {
    super('Match not found', HttpStatus.NOT_FOUND);
  }
}

export class MatchAlreadyException extends HttpException {
  constructor() {
    super('Match already exist', HttpStatus.NOT_FOUND);
  }
}
