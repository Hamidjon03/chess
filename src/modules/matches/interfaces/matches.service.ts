import { ID } from 'src/common/types/type';
import { ResData } from 'src/lib/resData';
import { Match } from '../entities/match.entity';
import { CreateMatchDto } from '../dto/create-match.dto';

export interface IMatchesService {
  findOneById(id: ID): Promise<ResData<Match>>;
  findAll(): Promise<ResData<Array<Match>>>;
  update(id: ID, dto: Match): Promise<ResData<Match | undefined>>;
  delete(id: ID): Promise<ResData<Match | undefined>>;
  create(dto: CreateMatchDto): Promise<ResData<Match>>;
}
