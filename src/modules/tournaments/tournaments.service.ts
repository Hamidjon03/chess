import { Inject, Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { ITournamentsRepository } from './interfaces/tournaments.repository';
import { ResData } from 'src/lib/resData';
import { Tournament } from './entities/tournament.entity';
import { ID } from 'src/common/types/type';
import { TournamentNotFoundException } from './exception/tournaments.exception';
import { ITournamentsService } from './interfaces/tournaments.service';
import { IPlayersRepository } from '../players/interfaces/players.repository';
import { In } from 'typeorm';

@Injectable()
export class TournamentsService implements ITournamentsService {
  constructor(
    @Inject('ITournamentsRepository')
    private readonly tournamentsRepository: ITournamentsRepository,

    @Inject('IPlayersRepository')
    private readonly playersRepository: IPlayersRepository,
  ) {}

  async findOneById(id: number): Promise<ResData<Tournament>> {
    const data = await this.tournamentsRepository.findOneById(id);
    if (!data) {
      throw new TournamentNotFoundException();
    }
    return new ResData<Tournament>('success', 200, data);
  }

  async findAll(): Promise<ResData<Tournament[]>> {
    const data = await this.tournamentsRepository.findAll();

    return new ResData('success', 200, data);
  }

  async update(
    id: number,
    dto: UpdateTournamentDto,
  ): Promise<ResData<Tournament>> {
    // Retrieve the tournament from the database
    const tournament = await this.tournamentsRepository.findOneById(id);

    // If the tournament is not found, throw an error
    if (!tournament) {
      throw new TournamentNotFoundException();
    }

    // If participants are provided in the DTO, validate and add them to the tournament
    if (dto.participants && dto.participants.length > 0) {
      const participants = await this.playersRepository.find({
        where: {
          id: In(dto.participants),
        },
      });

      // If some participants are not found, throw an error
      if (participants.length !== dto.participants.length) {
        throw new Error('Some players not found');
      }

      // Add found participants to the tournament
      tournament.participants = participants;
    }

    // Update tournament details
    tournament.name = dto.name;
    tournament.startDate = dto.startDate;
    tournament.endDate = dto.endDate;

    // Save the updated tournament to the database
    const updatedTournament =
      await this.tournamentsRepository.update(tournament);

    return new ResData<Tournament>(
      'Tournament was updated successfully',
      200,
      updatedTournament,
    );
  }

  async create(dto: CreateTournamentDto): Promise<ResData<Tournament>> {
    const newTournament = new Tournament();
    newTournament.name = dto.name;
    newTournament.startDate = dto.startDate;
    newTournament.endDate = dto.endDate;

    if (dto.participants && dto.participants.length > 0) {
      // Retrieve players from the database
      const participants = await this.playersRepository.find({
        where: {
          id: In(dto.participants),
        },
      });

      // If participants are provided in the DTO, validate and add them to the tournament
      if (participants.length > 0) {
        newTournament.participants = participants;
      } else {
        // If no players are found, throw an error
        throw new Error('Some players not found');
      }
    }

    // Save the new tournament to the database
    const newData = await this.tournamentsRepository.insert(newTournament);
    return new ResData<Tournament>(
      'Tournament was created successfully',
      201,
      newData,
    );
  }

  async delete(id: ID) {
    const { data: foundData } = await this.findOneById(id);
    const data = await this.tournamentsRepository.delete(foundData);

    return new ResData('success', 200, data);
  }

  async findOneByName(name: string): Promise<ResData<Tournament | undefined>> {
    const data = await this.tournamentsRepository.findOneByName(name);

    const resData = new ResData('success', 200, data);
    if (!data) {
      resData.message = 'not found by name';
      resData.statusCode = 404;
    }
    return resData;
  }
}
