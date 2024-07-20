import { Leaderboard } from 'src/modules/leaderboard/entities/leaderboard.entity';
import { Match } from 'src/modules/matches/entities/match.entity';
import { Player } from 'src/modules/players/entities/player.entity';
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
@Entity()
export class Tournament extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'timestamp', nullable: false })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: false })
  endDate: Date;

  @ManyToMany(() => Player, (player) => player.tournaments, { eager: true })
  @JoinTable()
  participants: Player[];

  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.tournament)
  leaderboards: Leaderboard[];

  @OneToMany(() => Match, (match) => match.tournament)
  matches: Match[];
}
