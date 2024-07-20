import { ID } from 'src/common/types/type';
import { ResData } from 'src/lib/resData';
import { Tournament } from '../entities/tournament.entity';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';
import { CreateTournamentDto } from '../dto/create-tournament.dto';

export interface ITournamentsService {
  findOneById(id: ID): Promise<ResData<Tournament>>;
  findAll(): Promise<ResData<Array<Tournament>>>;
  update(
    id: ID,
    dto: UpdateTournamentDto,
  ): Promise<ResData<Tournament | undefined>>;
  delete(id: ID): Promise<ResData<Tournament | undefined>>;
  findOneByName(name: string): Promise<ResData<Tournament | undefined>>;
  create(dto: CreateTournamentDto): Promise<ResData<Tournament>>;
}
