import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { MatchesModule } from './modules/matches/matches.module';
import { PlayersModule } from './modules/players/players.module';
import { LeaderboardModule } from './modules/leaderboard/leaderboard.module';
import { typeormConfig } from './common/config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    UsersModule,
    TournamentsModule,
    MatchesModule,
    PlayersModule,
    LeaderboardModule,
  ],
})
export class AppModule {}
