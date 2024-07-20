import { Inject, Injectable } from '@nestjs/common';
import { CreateLeaderboardDto } from './dto/create-leaderboard.dto';
import { UpdateLeaderboardDto } from './dto/update-leaderboard.dto';
import { ILeaderboardService } from './interfaces/leaderboard.service';
import { ResData } from 'src/lib/resData';
import { Leaderboard } from './entities/leaderboard.entity';
import { ILeaderboardRepository } from './interfaces/leaderboard.repository';
import { LeaderboardNotFoundException } from './exception/leaderboard.exception';
import { ID } from 'src/common/types/type';

@Injectable()
export class LeaderboardService implements ILeaderboardService {
  constructor(
    @Inject('ILeaderboardRepository')
    private readonly leaderboardrepository: ILeaderboardRepository,
  ) {}
  async findOneById(id: number): Promise<ResData<Leaderboard>> {
    const data = await this.leaderboardrepository.findOneById(id);
    if (!data) {
      throw new LeaderboardNotFoundException();
    }
    return new ResData<Leaderboard>('success', 200, data);
  }

  async findAll(): Promise<ResData<Leaderboard[]>> {
    const data = await this.leaderboardrepository.findAll();

    return new ResData('success', 200, data);
  }

  async update(
    id: ID,
    updateLeaderboardDto: UpdateLeaderboardDto,
  ): Promise<ResData<Leaderboard | undefined>> {
    const { data: foundData } = await this.findOneById(id);
    const updateData = Object.assign(foundData, updateLeaderboardDto);
    const data = await this.leaderboardrepository.update(updateData);
    return new ResData<Leaderboard>('ok', 200, data);
  }
  async delete(id: ID) {
    const { data: foundData } = await this.findOneById(id);
    const data = await this.leaderboardrepository.delete(foundData);

    return new ResData('success', 200, data);
  }

  async create(dto: CreateLeaderboardDto): Promise<ResData<Leaderboard>> {
    let newLeaderboard = new Leaderboard();
    newLeaderboard = Object.assign(dto, newLeaderboard);
    const newData = await this.leaderboardrepository.insert(newLeaderboard);
    return new ResData<Leaderboard>(
      'Leaderboard was created successfully',
      201,
      newData,
    );
  }
}
