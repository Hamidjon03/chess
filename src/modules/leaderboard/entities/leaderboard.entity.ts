import { Player } from 'src/modules/players/entities/player.entity';
import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';

@Entity()
export class Leaderboard extends BaseEntity {
  @ManyToOne(() => Tournament, (tournament) => tournament.leaderboards)
  tournament: Tournament;

  @ManyToOne(() => Player, (player) => player.leaderboards)
  player: Player;

  @Column()
  points: number;

  @Column()
  rank: number;
}
