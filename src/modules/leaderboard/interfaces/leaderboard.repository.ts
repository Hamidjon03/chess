import { Leaderboard } from '../entities/leaderboard.entity';

export interface ILeaderboardRepository {
  create(entity: Leaderboard): Promise<Leaderboard>;
  findAll(): Promise<Leaderboard[]>;
  findOneById(id: number): Promise<Leaderboard | null>;
  update(entity: Leaderboard): Promise<Leaderboard>;
  delete(id: number): Promise<void>;
  findByPlayerId(playerId: number): Promise<Leaderboard[]>;
  findByTournamentId(tournamentId: number): Promise<Leaderboard[]>;
}
