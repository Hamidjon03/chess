import { Inject, Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { IMatchesService } from './interfaces/matches.service';
import { ResData } from 'src/lib/resData';
import { Match } from './entities/match.entity';
import { ID } from 'src/common/types/type';
import { MatchNotFoundException } from './exception/matches.exception';
import { IMatchesRepository } from './interfaces/matches.repository';

@Injectable()
export class MatchesService implements IMatchesService {
  constructor(
    @Inject('IMatchesRepository')
    private readonly matchesrepository: IMatchesRepository,
  ) {}
  async findOneById(id: number): Promise<ResData<Match>> {
    const data = await this.matchesrepository.findOneById(id);
    if (!data) {
      throw new MatchNotFoundException();
    }
    return new ResData<Match>('success', 200, data);
  }

  async findAll(): Promise<ResData<Match[]>> {
    const data = await this.matchesrepository.findAll();

    return new ResData('success', 200, data);
  }

  async update(
    id: ID,
    updateMatchDto: UpdateMatchDto,
  ): Promise<ResData<Match | undefined>> {
    const { data: foundData } = await this.findOneById(id);
    const updateData = Object.assign(foundData, updateMatchDto);
    const data = await this.matchesrepository.update(updateData);
    return new ResData<Match>('ok', 200, data);
  }
  async delete(id: ID) {
    const { data: foundData } = await this.findOneById(id);
    const data = await this.matchesrepository.delete(foundData);

    return new ResData('success', 200, data);
  }

  async create(dto: CreateMatchDto): Promise<ResData<Match>> {
    let newMatch = new Match();
    newMatch = Object.assign(dto, newMatch);
    const newData = await this.matchesrepository.insert(newMatch);
    return new ResData<Match>('Match was created successfully', 201, newData);
  }
}
