import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Leaderboard } from './entities/leaderboard.entity';
import { LeaderboardRepository } from './leaderboard.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Leaderboard])],
  controllers: [LeaderboardController],
  providers: [
    { provide: 'ILeaderboardService', useClass: LeaderboardService },
    { provide: 'ILeaderboardRepository', useClass: LeaderboardRepository },
  ],
})
export class LeaderboardModule {}
