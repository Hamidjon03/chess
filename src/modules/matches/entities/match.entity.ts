import { Player } from 'src/modules/players/entities/player.entity';
import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';

@Entity()
export class Match extends BaseEntity {
  @ManyToOne(() => Tournament, (tournament) => tournament.matches)
  tournament: Tournament;

  @ManyToOne(() => Player, (player) => player.matches1)
  player1: Player;

  @ManyToOne(() => Player, (player) => player.matches2)
  player2: Player;

  @Column()
  result: string; // 'player1' yoki 'player2' yoki 'draw'
}
