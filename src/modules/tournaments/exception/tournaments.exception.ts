import { HttpException, HttpStatus } from '@nestjs/common';

export class TournamentNotFoundException extends HttpException {
  constructor() {
    super('Tournament not found', HttpStatus.NOT_FOUND);
  }
}

export class TournamentAlreadyException extends HttpException {
  constructor() {
    super('Tournament already exist', HttpStatus.NOT_FOUND);
  }
}

export class ParticipantNotFoundException extends HttpException {
  constructor() {
    super('Participant not found', HttpStatus.NOT_FOUND);
  }
}

