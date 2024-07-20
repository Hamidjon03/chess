import { Match } from '../entities/match.entity';
import { ID } from 'src/common/types/type';

export interface IMatchesRepository {
  insert(entity: Match): Promise<Match>;
  findAll(): Promise<Match[]>;
  findOneById(id: ID): Promise<Match | null>;
  update(dto: Match): Promise<Match>;
  delete(entity: Match): Promise<Match>;
}
