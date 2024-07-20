import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { ITournamentsRepository } from './interfaces/tournaments.repository';

export class TournamentsRepository implements ITournamentsRepository {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async update(dto: Tournament): Promise<Tournament> {
    return await this.tournamentRepository.save(dto);
  }
  async delete(entity: Tournament): Promise<Tournament> {
    return await this.tournamentRepository.remove(entity);
  }

  async insert(entity: Tournament): Promise<Tournament> {
    const newTournament = this.tournamentRepository.create(entity);
    await this.tournamentRepository.save(newTournament);
    return newTournament;
  }

  async findAll(): Promise<Array<Tournament>> {
    return await this.tournamentRepository.find({
      relations: ['participants'],
    });
  }

  async findOneById(id: number): Promise<Tournament | undefined> {
    return await this.tournamentRepository.findOne({
      where: { id },
      relations: ['participants'],
    });
  }

  async findOneByName(name: string): Promise<Tournament> {
    return await this.tournamentRepository.findOneBy({ name });
  }
}
