import { HttpException, HttpStatus } from '@nestjs/common';

export class LeaderboardNotFoundException extends HttpException {
  constructor() {
    super('Leaderboard not found', HttpStatus.NOT_FOUND);
  }
}

export class LeaderboardAlreadyException extends HttpException {
  constructor() {
    super('Leaderboard already exist', HttpStatus.NOT_FOUND);
  }
}
