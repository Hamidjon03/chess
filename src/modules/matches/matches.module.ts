import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { MatchesRepository } from './matches.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  controllers: [MatchesController],
  providers: [
    { provide: 'IMatchesService', useClass: MatchesService },
    { provide: 'IMatchesRepository', useClass: MatchesRepository },
  ],
})
export class MatchesModule {}
