import { ID } from 'src/common/types/type';
import { User } from '../entities/user.entity';

export interface IUsersRepository {
  insert(entity: User): Promise<User>;
  findAll(): Promise<Array<User>>;
  findOneById(id: ID): Promise<User | undefined>;
  update(dto: User): Promise<User | undefined>;
  delete(entity: User): Promise<User>;
  findOneByLogin(login: string): Promise<User | undefined>;
}
