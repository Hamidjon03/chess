import { CreateLeaderboardDto } from '../dto/create-leaderboard.dto';
import { UpdateLeaderboardDto } from '../dto/update-leaderboard.dto';
import { Leaderboard } from '../entities/leaderboard.entity';
import { ResData } from 'src/lib/resData';

export interface ILeaderboardService {
  create(dto: CreateLeaderboardDto): Promise<ResData<Leaderboard>>;
  findAll(): Promise<ResData<Leaderboard[]>>;
  findOneById(id: number): Promise<ResData<Leaderboard>>;
  update(id: number, dto: UpdateLeaderboardDto): Promise<ResData<Leaderboard>>;
  delete(id: number): Promise<ResData<void>>;
  findByPlayerId(playerId: number): Promise<ResData<Leaderboard[]>>;
  findByTournamentId(tournamentId: number): Promise<ResData<Leaderboard[]>>;
}
