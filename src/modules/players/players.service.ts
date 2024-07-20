import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ResData } from 'src/lib/resData';
import { IPlayersRepository } from './interfaces/players.repository';
import { IPlayersService } from './interfaces/players.service';
import { Player } from './entities/player.entity';
import { ID } from 'src/common/types/type';
import { PlayerNotFoundException } from './exception/players.exception';
import { IUsersRepository } from '../users/interfaces/users.repository';
import { UserNotFoundException } from '../users/exception/users.exception';

@Injectable()
export class PlayersService implements IPlayersService {
  constructor(
    @Inject('IPlayersRepository')
    private readonly playersrepository: IPlayersRepository,

    @Inject('IUsersRepository')
    private readonly usersrepository: IUsersRepository,
  ) {}
  async findOneById(id: number): Promise<ResData<Player>> {
    const data = await this.playersrepository.findOneById(id);
    if (!data) {
      throw new PlayerNotFoundException();
    }
    return new ResData<Player>('success', 200, data);
  }

  async findAll(): Promise<ResData<Player[]>> {
    const data = await this.playersrepository.findAll();

    return new ResData('success', 200, data);
  }

  async update(
    id: ID,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<ResData<Player | undefined>> {
    const isUserAviable = await this.usersrepository.findOneById(
      updatePlayerDto.user,
    );
    if (!isUserAviable) {
      throw new UserNotFoundException();
    }
    const { data: foundData } = await this.findOneById(id);
    const updateData = Object.assign(foundData, updatePlayerDto);
    const data = await this.playersrepository.update(updateData);
    return new ResData<Player>('Player was updated successfully', 200, data);
  }
  async delete(id: ID) {
    const { data: foundData } = await this.findOneById(id);
    const data = await this.playersrepository.delete(foundData);

    return new ResData('success', 200, data);
  }

  async create(dto: CreatePlayerDto): Promise<ResData<Player>> {
    const isUserAvailable = await this.usersrepository.findOneById(dto.user);
    if (!isUserAvailable) {
      throw new UserNotFoundException();
    }
    // Check if the user is already linked to another player
    const existingPlayer = await this.playersrepository.findByUserId(dto.user);
    if (existingPlayer) {
      throw new ConflictException('User is already linked to another player');
    }
    let newPlayer = new Player();
    newPlayer = Object.assign(dto, newPlayer);
    newPlayer.user = isUserAvailable;
    const newData = await this.playersrepository.insert(newPlayer);
    return new ResData<Player>('Player was created successfully', 201, newData);
  }

  async findOneByName(name: string): Promise<ResData<Player | undefined>> {
    const data = await this.playersrepository.findOneByName(name);

    const resData = new ResData('success', 200, data);
    if (!data) {
      resData.message = 'not found by name';
      resData.statusCode = 404;
    }
    return resData;
  }

  async findOneUserId(id: ID): Promise<ResData<Player | undefined>> {
    const data = await this.playersrepository.findByUserId(id);

    const resData = new ResData('success', 200, data);
    if (!data) {
      resData.message = 'not found by name';
      resData.statusCode = 404;
    }
    return resData;
  }
}
