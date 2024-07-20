import { Injectable, Inject } from '@nestjs/common';
import { ILeaderboardService } from './interfaces/leaderboard.service';
import { ILeaderboardRepository } from './interfaces/leaderboard.repository';
import { CreateLeaderboardDto } from './dto/create-leaderboard.dto';
import { Leaderboard } from './entities/leaderboard.entity';
import { ResData } from 'src/lib/resData';
import { LeaderboardNotFoundException } from './exception/leaderboard.exception';
import { UpdateLeaderboardDto } from './dto/update-leaderboard.dto';

@Injectable()
export class LeaderboardService implements ILeaderboardService {
  constructor(
    @Inject('ILeaderboardRepository')
    private readonly leaderboardRepository: ILeaderboardRepository,
  ) {}

  async create(dto: CreateLeaderboardDto): Promise<ResData<Leaderboard>> {
    const newLeaderboard = new Leaderboard();
    newLeaderboard.player = { id: dto.playerId } as any;
    newLeaderboard.tournament = { id: dto.tournamentId } as any;
    newLeaderboard.score = dto.score;
    newLeaderboard.rank = dto.rank;

    const createdLeaderboard =
      await this.leaderboardRepository.create(newLeaderboard);
    return new ResData<Leaderboard>(
      'Leaderboard was created successfully',
      201,
      createdLeaderboard,
    );
  }

  async findAll(): Promise<ResData<Leaderboard[]>> {
    const leaderboards = await this.leaderboardRepository.findAll();
    return new ResData('success', 200, leaderboards);
  }

  async findOneById(id: number): Promise<ResData<Leaderboard>> {
    const leaderboard = await this.leaderboardRepository.findOneById(id);
    if (!leaderboard) {
      throw new LeaderboardNotFoundException();
    }
    return new ResData<Leaderboard>('success', 200, leaderboard);
  }

  async update(
    id: number,
    dto: UpdateLeaderboardDto,
  ): Promise<ResData<Leaderboard>> {
    const leaderboard = await this.leaderboardRepository.findOneById(id);
    if (!leaderboard) {
      throw new LeaderboardNotFoundException();
    }

    if (dto.playerId) {
      leaderboard.player = { id: dto.playerId } as any;
    }
    if (dto.tournamentId) {
      leaderboard.tournament = { id: dto.tournamentId } as any;
    }
    if (dto.score) {
      leaderboard.score = dto.score;
    }
    if (dto.rank) {
      leaderboard.rank = dto.rank;
    }

    const updatedLeaderboard =
      await this.leaderboardRepository.update(leaderboard);
    return new ResData<Leaderboard>(
      'Leaderboard was updated successfully',
      200,
      updatedLeaderboard,
    );
  }

  async delete(id: number): Promise<ResData<void>> {
    await this.leaderboardRepository.delete(id);
    return new ResData<void>('Leaderboard was deleted successfully', 200, null);
  }

  async findByPlayerId(playerId: number): Promise<ResData<Leaderboard[]>> {
    const leaderboards =
      await this.leaderboardRepository.findByPlayerId(playerId);
    return new ResData<Leaderboard[]>('success', 200, leaderboards);
  }

  async findByTournamentId(
    tournamentId: number,
  ): Promise<ResData<Leaderboard[]>> {
    const leaderboards =
      await this.leaderboardRepository.findByTournamentId(tournamentId);
    return new ResData<Leaderboard[]>('success', 200, leaderboards);
  }
}
