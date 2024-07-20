import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILeaderboardRepository } from './interfaces/leaderboard.repository';
import { Leaderboard } from './entities/leaderboard.entity';

export class LeaderboardRepository implements ILeaderboardRepository {
  constructor(
    @InjectRepository(Leaderboard)
    private readonly LeaderboardRepository: Repository<Leaderboard>,
  ) {}

  async update(dto: Leaderboard): Promise<Leaderboard> {
    return await this.LeaderboardRepository.save(dto);
  }
  async delete(entity: Leaderboard): Promise<Leaderboard> {
    return await this.LeaderboardRepository.remove(entity);
  }

  async insert(entity: Leaderboard): Promise<Leaderboard> {
    const newLeaderboard = this.LeaderboardRepository.create(entity);
    await this.LeaderboardRepository.save(newLeaderboard);
    return newLeaderboard;
  }

  async findAll(): Promise<Array<Leaderboard>> {
    return await this.LeaderboardRepository.find();
  }

  async findOneById(id: number): Promise<Leaderboard | null> {
    return await this.LeaderboardRepository.findOneBy({ id });
  }
}
