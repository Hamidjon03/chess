import { InjectRepository } from '@nestjs/typeorm';
import { IUsersRepository } from './interfaces/users.repository';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

export class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async update(dto: User): Promise<User> {
    return await this.userRepository.save(dto);
  }
  async delete(entity: User): Promise<User> {
    return await this.userRepository.remove(entity);
  }

  async insert(entity: User): Promise<User> {
    const newUser = this.userRepository.create(entity);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async findAll(): Promise<Array<User>> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByLogin(login: string): Promise<User> {
    return await this.userRepository.findOneBy({ login });
  }
}
