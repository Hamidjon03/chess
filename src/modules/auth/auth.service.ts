import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService, ILoginData } from './interfaces/auth.service';
import { ResData } from 'src/lib/resData';
import { JwtService } from '@nestjs/jwt';
import { LoginOrPasswordWrong } from './exception/auth.exception';
import { BcryptHashing } from 'src/lib/bcrypt';
import { IUsersService } from '../users/interfaces/users.service';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUsersService') private readonly userService: IUsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<ResData<ILoginData>> {
    const { data: foundUser } = await this.userService.findOneByLogin(
      dto.login,
    );

    if (!foundUser) {
      throw new LoginOrPasswordWrong();
    }

    const isMatch = await BcryptHashing.compare(
      dto.password,
      foundUser.password,
    );

    if (!isMatch) {
      throw new LoginOrPasswordWrong();
    }

    const token = await this.jwtService.signAsync({ id: foundUser.id });
    return new ResData<ILoginData>('success', HttpStatus.OK, {
      user: foundUser,
      token,
    });
  }

  async register(dto: RegisterDto): Promise<ResData<ILoginData>> {
    const hashedPassword = await BcryptHashing.hash(dto.password);
    dto.password = hashedPassword;

    const { data: newUser } = await this.userService.create(dto);
    const token = await this.jwtService.signAsync({ id: newUser.id });

    return new ResData<ILoginData>(
      'User was registered successfully',
      HttpStatus.CREATED,
      {
        user: newUser,
        token,
      },
    );
  }
}
