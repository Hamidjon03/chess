import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { PlayersRepository } from './players.repository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), SharedModule],
  controllers: [PlayersController],
  providers: [
    { provide: 'IPlayersService', useClass: PlayersService },
    { provide: 'IPlayersRepository', useClass: PlayersRepository },
  ],
  exports: [
    { provide: 'IPlayersService', useClass: PlayersService },
    { provide: 'IPlayersRepository', useClass: PlayersRepository },
  ],
})
export class PlayersModule {}
