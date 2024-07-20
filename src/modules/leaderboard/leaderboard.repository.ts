import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILeaderboardRepository } from './interfaces/leaderboard.repository';
import { Leaderboard } from './entities/leaderboard.entity';

@Injectable()
export class LeaderboardRepository implements ILeaderboardRepository {
  constructor(
    @InjectRepository(Leaderboard)
    private readonly leaderboardRepository: Repository<Leaderboard>,
  ) {}

  async create(entity: Leaderboard): Promise<Leaderboard> {
    return await this.leaderboardRepository.save(entity);
  }

  async findAll(): Promise<Leaderboard[]> {
    return await this.leaderboardRepository.find();
  }

  async findOneById(id: number): Promise<Leaderboard | null> {
    return await this.leaderboardRepository.findOne({ where: { id } });
  }

  async update(entity: Leaderboard): Promise<Leaderboard> {
    return await this.leaderboardRepository.save(entity);
  }

  async delete(id: number): Promise<void> {
    await this.leaderboardRepository.delete(id);
  }

  async findByPlayerId(playerId: number): Promise<Leaderboard[]> {
    return await this.leaderboardRepository.find({
      where: { player: { id: playerId } },
    });
  }

  async findByTournamentId(tournamentId: number): Promise<Leaderboard[]> {
    return await this.leaderboardRepository.find({
      where: { tournament: { id: tournamentId } },
    });
  }
}
