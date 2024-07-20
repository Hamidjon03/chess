import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { IMatchesRepository } from './interfaces/matches.repository';

export class MatchesRepository implements IMatchesRepository {
  constructor(
    @InjectRepository(Match)
    private readonly MatchRepository: Repository<Match>,
  ) {}

  async update(dto: Match): Promise<Match> {
    return await this.MatchRepository.save(dto);
  }
  async delete(entity: Match): Promise<Match> {
    return await this.MatchRepository.remove(entity);
  }

  async insert(entity: Match): Promise<Match> {
    const newMatch = this.MatchRepository.create(entity);
    await this.MatchRepository.save(newMatch);
    return newMatch;
  }

  async findAll(): Promise<Array<Match>> {
    return await this.MatchRepository.find();
  }

  async findOneById(id: number): Promise<Match | null> {
    return await this.MatchRepository.findOneBy({ id });
  }
}
