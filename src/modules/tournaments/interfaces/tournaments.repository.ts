import { ID } from 'src/common/types/type';
import { Tournament } from '../entities/tournament.entity';

export interface ITournamentsRepository {
  insert(entity: Tournament): Promise<Tournament>;
  findAll(): Promise<Array<Tournament>>;
  findOneById(id: ID): Promise<Tournament | undefined>;
  update(dto: Tournament): Promise<Tournament | undefined>;
  delete(entity: Tournament): Promise<Tournament>;
  findOneByName(name: string): Promise<Tournament | undefined>;
}
