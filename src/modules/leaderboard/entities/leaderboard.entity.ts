import { Player } from 'src/modules/players/entities/player.entity';
import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';

@Entity()
export class Leaderboard extends BaseEntity {
  @ManyToOne(() => Player, (player) => player.leaderboards, { eager: true })
  player: Player;

  @ManyToOne(() => Tournament, (tournament) => tournament.leaderboards, {
    eager: true,
  })
  tournament: Tournament;

  @Column({ type: 'int', nullable: false })
  score: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  rank: string;
}
