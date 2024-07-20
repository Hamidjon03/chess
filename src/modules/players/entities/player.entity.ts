import { Leaderboard } from 'src/modules/leaderboard/entities/leaderboard.entity';
import { Match } from 'src/modules/matches/entities/match.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';

@Entity()
export class Player extends BaseEntity {
  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  rating: number;

  @Column()
  country: string;

  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.player)
  leaderboards: Leaderboard[];

  @OneToMany(() => Match, (match) => match.player1) // Bog'lanishni qo'shing
  matches1: Match[];

  @OneToMany(() => Match, (match) => match.player2) // Bog'lanishni qo'shing
  matches2: Match[];
}
