import {
  Controller,
  Post,
  Body,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IAuthService } from './interfaces/auth.service';
import { IUsersService } from '../users/interfaces/users.service';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { UserAlreadyException } from '../users/exception/users.exception';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly authService: IAuthService,
    @Inject('IUsersService') private readonly userService: IUsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { data: foundUser } = await this.userService.findOneByLogin(
      registerDto.login,
    );

    if (foundUser) {
      throw new UserAlreadyException();
    }
    return await this.authService.register(registerDto);
  }
}
