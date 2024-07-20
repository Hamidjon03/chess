import { Leaderboard } from 'src/modules/leaderboard/entities/leaderboard.entity';
import { Match } from 'src/modules/matches/entities/match.entity';
import { Entity, Column, OneToMany, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database/baseEntity';
import { User } from 'src/modules/users/entities/user.entity';
import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';

@Entity()
export class Player extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'int', nullable: false })
  rating: number;

  @Column({ nullable: false })
  country: string;

  @ManyToMany(() => Tournament, (tournament) => tournament.participants)
  tournaments: Tournament[];

  @OneToOne(() => User, (user) => user.player, { nullable: false })
  @JoinColumn()
  user: User;

  @OneToMany(() => Leaderboard, (leaderboard) => leaderboard.player)
  leaderboards: Leaderboard[];

  @OneToMany(() => Match, (match) => match.player1) // Bog'lanishni qo'shing
  matches1: Match[];

  @OneToMany(() => Match, (match) => match.player2) // Bog'lanishni qo'shing
  matches2: Match[];
}
