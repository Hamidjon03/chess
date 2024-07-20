import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { MatchesModule } from './modules/matches/matches.module';
import { PlayersModule } from './modules/players/players.module';
import { LeaderboardModule } from './modules/leaderboard/leaderboard.module';
import { config } from './common/config';
import { Auth } from './modules/auth/entities/auth.entity';
import { User } from './modules/users/entities/user.entity';
import { Tournament } from './modules/tournaments/entities/tournament.entity';
import { Match } from './modules/matches/entities/match.entity';
import { Player } from './modules/players/entities/player.entity';
import { Leaderboard } from './modules/leaderboard/entities/leaderboard.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.database_host,
      port: config.database_port,
      username: config.database_user,
      password: config.database_password,
      database: config.database,
      entities: [Auth, User, Tournament, Match, Player, Leaderboard],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TournamentsModule,
    MatchesModule,
    PlayersModule,
    LeaderboardModule,
  ],
})
export class AppModule {}
