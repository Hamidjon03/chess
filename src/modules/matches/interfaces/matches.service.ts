import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { ResData } from 'src/lib/resData';
import { Match } from '../entities/match.entity';

export interface IMatchesService {
  findOneById(id: number): Promise<ResData<Match | null>>;
  findAll(): Promise<ResData<Match[]>>;
  create(dto: CreateMatchDto): Promise<ResData<Match>>;
  update(id: number, dto: UpdateMatchDto): Promise<ResData<Match>>;
  delete(id: number): Promise<ResData<Match>>;
}
