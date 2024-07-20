import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ID } from 'src/common/types/type';
import { IMatchesRepository } from './interfaces/matches.repository';
import { Match } from './entities/match.entity';

export class MatchesRepository implements IMatchesRepository {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  async insert(entity: Match): Promise<Match> {
    return await this.matchRepository.save(entity);
  }

  async findAll(): Promise<Match[]> {
    return await this.matchRepository.find();
  }

  async findOneById(id: ID): Promise<Match | null> {
    const queryBuilder: SelectQueryBuilder<Match> =
      this.matchRepository.createQueryBuilder('match');

    // Adding necessary joins for relations
    queryBuilder
      .leftJoinAndSelect('match.tournament', 'tournament')
      .leftJoinAndSelect('match.player1', 'player1')
      .leftJoinAndSelect('match.player2', 'player2')
      .where('match.id = :id', { id });

    return (await queryBuilder.getOne()) || null;
  }

  async update(dto: Match): Promise<Match> {
    return await this.matchRepository.save(dto);
  }

  async delete(entity: Match): Promise<Match> {
    return await this.matchRepository.remove(entity);
  }
}
