import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginOrPasswordWrong extends HttpException {
  constructor() {
    super('Login or Password wrong!', HttpStatus.BAD_REQUEST);
  }
}
