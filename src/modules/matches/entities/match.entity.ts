import { BaseEntity } from 'src/common/database/baseEntity';
import { Player } from 'src/modules/players/entities/player.entity';
import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';
import { Entity, ManyToOne, Column } from 'typeorm';

@Entity()
export class Match extends BaseEntity {
  @ManyToOne(() => Tournament, (tournament) => tournament.matches, {
    eager: true,
  })
  tournament: Tournament;

  @ManyToOne(() => Player, (player) => player.matches1, { eager: true })
  player1: Player;

  @ManyToOne(() => Player, (player) => player.matches2, { eager: true })
  player2: Player;

  @Column()
  result: string; // 'player1', 'player2', or 'draw'

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @Column({ type: 'int', nullable: false })
  score: number;
}
