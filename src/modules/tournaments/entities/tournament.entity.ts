import { Leaderboard } from 'src/modules/leaderboard/entities/leaderboard.entity';
import { Match } from 'src/modules/matches/entities/match.entity';
import { Player } from 'src/modules/players/entities/player.entity';
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
@Entity()
export class Tournament extends BaseEntity {
  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @ManyToMany(() => Player)
  @JoinTable()
  participants: Player[];

  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.tournament)
  leaderboards: Leaderboard[];

  @OneToMany(() => Match, (match) => match.tournament) // Bog'lanishni qo'shing
  matches: Match[];
}
