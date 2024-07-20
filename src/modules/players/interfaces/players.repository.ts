import { ID } from 'src/common/types/type';
import { Player } from '../entities/player.entity';

export interface IPlayersRepository {
  insert(entity: Player): Promise<Player>;
  findAll(): Promise<Array<Player>>;
  find(oprion: any): Promise<Array<Player>>;
  findOneById(id: ID): Promise<Player | undefined>;
  update(dto: Player): Promise<Player | undefined>;
  delete(entity: Player): Promise<Player>;
  findOneByName(name: string): Promise<Player | undefined>;
  findByUserId(userId: ID): Promise<Player | undefined>;
}
