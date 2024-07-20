import { ID } from 'src/common/types/type';
import { Leaderboard } from '../entities/leaderboard.entity';

export interface ILeaderboardRepository {
  insert(entity: Leaderboard): Promise<Leaderboard>;
  findAll(): Promise<Array<Leaderboard>>;
  findOneById(id: ID): Promise<Leaderboard | undefined>;
  update(dto: Leaderboard): Promise<Leaderboard | undefined>;
  delete(entity: Leaderboard): Promise<Leaderboard>;
}
