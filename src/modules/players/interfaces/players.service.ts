import { ID } from 'src/common/types/type';
import { ResData } from 'src/lib/resData';
import { Player } from '../entities/player.entity';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { UpdatePlayerDto } from '../dto/update-player.dto';

export interface IPlayersService {
  findOneById(id: ID): Promise<ResData<Player>>;
  findAll(): Promise<ResData<Array<Player>>>;
  update(id: ID, dto: UpdatePlayerDto): Promise<ResData<Player | undefined>>;
  delete(id: ID): Promise<ResData<Player | undefined>>;
  findOneByName(name: string): Promise<ResData<Player | undefined>>;
  create(dto: CreatePlayerDto): Promise<ResData<Player>>;
}
