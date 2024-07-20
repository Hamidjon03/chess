import { Inject, Injectable } from '@nestjs/common';
import { IMatchesService } from './interfaces/matches.service';
import { IMatchesRepository } from './interfaces/matches.repository';
import { IPlayersRepository } from '../players/interfaces/players.repository';
import { ITournamentsRepository } from '../tournaments/interfaces/tournaments.repository';
import { ResData } from 'src/lib/resData';
import { Match } from './entities/match.entity';
import {
  MatchAlreadyException,
  MatchNotFoundException,
} from './exception/matches.exception';
import { CreateMatchDto } from './dto/create-match.dto';
import { TournamentNotFoundException } from '../tournaments/exception/tournaments.exception';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ID } from 'src/common/types/type';

@Injectable()
export class MatchesService implements IMatchesService {
  constructor(
    @Inject('IMatchesRepository')
    private readonly matchesRepository: IMatchesRepository,

    @Inject('IPlayersRepository')
    private readonly playersRepository: IPlayersRepository,

    @Inject('ITournamentsRepository')
    private readonly tournamentRepository: ITournamentsRepository,
  ) {}

  async findOneById(id: number): Promise<ResData<Match>> {
    const data = await this.matchesRepository.findOneById(id);
    if (!data) {
      throw new MatchNotFoundException();
    }
    return new ResData<Match>('success', 200, data);
  }

  async findAll(): Promise<ResData<Match[]>> {
    const data = await this.matchesRepository.findAll();
    return new ResData('success', 200, data);
  }

  // Create a new match and assign players
  async create(dto: CreateMatchDto): Promise<ResData<Match>> {
    const newMatch = new Match();

    const { tournamentId, player1Id, player2Id, result, date, score } = dto;
    // const isExistMatch = await this.findOneById(dto.matchName)
    // if (isExistMatch) {
    //   throw new MatchAlreadyException();
    // }

    // Verify tournament exists
    const tournament =
      await this.tournamentRepository.findOneById(tournamentId);
    if (!tournament) {
      throw new TournamentNotFoundException();
    }

    // Verify players exist
    const player1 = await this.playersRepository.findOneById(player1Id);
    const player2 = await this.playersRepository.findOneById(player2Id);
    if (!player1 || !player2) {
      throw new Error('One or both players not found');
    }

    // Create and save new match
    newMatch.tournament = tournament;
    newMatch.player1 = player1;
    newMatch.player2 = player2;
    newMatch.result = result;
    newMatch.date = date;
    newMatch.score = score;

    // Save the new tournament to the database
    const newData = await this.matchesRepository.insert(newMatch);
    return new ResData<Match>('Match was created successfully', 201, newData);
  }

  // Update match details
  async update(id: number, dto: UpdateMatchDto): Promise<ResData<Match>> {
    const match = await this.matchesRepository.findOneById(id);
    if (!match) {
      throw new MatchNotFoundException();
    }

    // Update match details
    if (dto.tournamentId) {
      const tournament = await this.tournamentRepository.findOneById(
        dto.tournamentId,
      );
      if (tournament) match.tournament = tournament;
    }
    if (dto.player1Id) {
      const player1 = await this.playersRepository.findOneById(dto.player1Id);
      if (player1) match.player1 = player1;
    }
    if (dto.player2Id) {
      const player2 = await this.playersRepository.findOneById(dto.player2Id);
      if (player2) match.player2 = player2;
    }
    if (dto.result !== undefined) match.result = dto.result;
    if (dto.date) match.date = dto.date;
    if (dto.score !== undefined) match.score = dto.score;

    const newData = await this.matchesRepository.insert(match);
    return new ResData<Match>(
      'Tournament was updated successfully',
      200,
      newData,
    );
  }

  // Generate match pairings based on Swiss-system rules
  async generatePairings(tournamentId: number): Promise<void> {
    const tournament =
      await this.tournamentRepository.findOneById(tournamentId);
    if (!tournament) {
      throw new TournamentNotFoundException();
    }

    const players = tournament.participants;

    // Swiss-system algorithm to generate pairings
    // This is a simplified example, real Swiss-system algorithms are more complex
    const pairings = [];
    for (let i = 0; i < players.length; i += 2) {
      if (i + 1 < players.length) {
        pairings.push({
          player1: players[i],
          player2: players[i + 1],
        });
      }
    }

    // Save pairings as matches
    for (const pairing of pairings) {
      await this.create({
        tournamentId,
        player1Id: pairing.player1.id,
        player2Id: pairing.player2.id,
        result: 'draw', // Default result
        date: new Date(), // Set default date
        score: 0, // Default score
      });
    }
  }

  async delete(id: ID): Promise<ResData<Match>> {
    const match = await this.findOneById(id);
    await this.matchesRepository.delete(match.data);
    return new ResData('success', 200, match.data);
  }
}
