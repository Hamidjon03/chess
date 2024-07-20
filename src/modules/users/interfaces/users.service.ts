import { ID } from 'src/common/types/type';
import { ResData } from 'src/lib/resData';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUsersService {
  findOneById(id: ID): Promise<ResData<User>>;
  findAll(): Promise<ResData<Array<User>>>;
  update(id: ID, dto: UpdateUserDto): Promise<ResData<User | undefined>>;
  delete(id: ID): Promise<ResData<User | undefined>>;
  findOneByLogin(login: string): Promise<ResData<User | undefined>>;
  create(dto: CreateUserDto): Promise<ResData<User>>;
}
