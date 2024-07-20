import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUsersService } from './interfaces/users.service';
import { IUsersRepository } from './interfaces/users.repository';
import { ID } from 'src/common/types/type';
import { ResData } from 'src/lib/resData';
import { User } from './entities/user.entity';
import { UserNotFoundException } from './exception/users.exception';
import { BcryptHashing } from 'src/lib/bcrypt';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async findOneById(id: number): Promise<ResData<User>> {
    const data = await this.userRepository.findOneById(id);
    if (!data) {
      throw new UserNotFoundException();
    }
    return new ResData<User>('success', 200, data);
  }

  async findAll(): Promise<ResData<User[]>> {
    const data = await this.userRepository.findAll();

    return new ResData('success', 200, data);
  }

  async findOneByLogin(login: string): Promise<ResData<User>> {
    const data = await this.userRepository.findOneByLogin(login);

    const resData = new ResData('success', 200, data);
    if (!data) {
      resData.message = 'not found by name';
      resData.statusCode = 404;
    }
    return resData;
  }

  async update(id: ID, updateUserDto: UpdateUserDto) {
    const hashedPassword = await BcryptHashing.hash(updateUserDto.password);
    updateUserDto.password = hashedPassword;
    const { data: foundData } = await this.findOneById(id);
    const updateData = Object.assign(foundData, updateUserDto);
    const data = await this.userRepository.update(updateData);
    return new ResData<User>('ok', 200, data);
  }

  async delete(id: ID) {
    const { data: foundData } = await this.findOneById(id);
    const data = await this.userRepository.delete(foundData);

    return new ResData('success', 200, data);
  }

  async create(dto: CreateUserDto): Promise<ResData<User>> {
    let newUser = new User();
    // const hashedPassword = await BcryptHashing.hash(dto.password);
    // dto.password = hashedPassword;
    newUser = Object.assign(dto, newUser);
    const newData = await this.userRepository.insert(newUser);
    return new ResData<User>('user was created successfully', 201, newData);
  }
}
