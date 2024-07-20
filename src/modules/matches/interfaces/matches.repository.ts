import { ID } from 'src/common/types/type';
import { Match } from '../entities/match.entity';

export interface IMatchesRepository {
  insert(entity: Match): Promise<Match>;
  findAll(): Promise<Array<Match>>;
  findOneById(id: ID): Promise<Match | undefined>;
  update(dto: Match): Promise<Match | undefined>;
  delete(entity: Match): Promise<Match>;
}
