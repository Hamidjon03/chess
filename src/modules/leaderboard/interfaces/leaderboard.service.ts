import { ID } from 'src/common/types/type';
import { ResData } from 'src/lib/resData';
import { Leaderboard } from '../entities/leaderboard.entity';
import { CreateLeaderboardDto } from '../dto/create-leaderboard.dto';

export interface ILeaderboardService {
  findOneById(id: ID): Promise<ResData<Leaderboard>>;
  findAll(): Promise<ResData<Array<Leaderboard>>>;
  update(id: ID, dto: Leaderboard): Promise<ResData<Leaderboard | undefined>>;
  delete(id: ID): Promise<ResData<Leaderboard | undefined>>;
  create(dto: CreateLeaderboardDto): Promise<ResData<Leaderboard>>;
}
