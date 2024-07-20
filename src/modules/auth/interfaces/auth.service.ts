import { ResData } from 'src/lib/resData';
import { User } from 'src/modules/users/entities/user.entity';
import { LoginDto } from '../dto/login-auth.dto';
import { RegisterDto } from '../dto/register-auth.dto';

export interface ILoginData {
  user: User;
  token: string;
}

export interface IAuthService {
  login(dto: LoginDto): Promise<ResData<ILoginData>>;
  register(dto: RegisterDto): Promise<ResData<ILoginData>>;
}
