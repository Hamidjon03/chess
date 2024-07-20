import { Module } from '@nestjs/common';
import { TournamentsController } from './tournaments.controller';
import { Tournament } from './entities/tournament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentsService } from './tournaments.service';
import { TournamentsRepository } from './tournaments.repository';
import { SharedModule } from '../shared/shared.module';
import { PlayersModule } from '../players/players.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament]), PlayersModule],
  controllers: [TournamentsController],
  providers: [
    { provide: 'ITournamentsService', useClass: TournamentsService },
    { provide: 'ITournamentsRepository', useClass: TournamentsRepository },
  ],
})
export class TournamentsModule {}
