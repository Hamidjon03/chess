import { RoleEnum } from 'src/common/enums/enum';
import { BaseEntity } from 'src/common/database/baseEntity';
import { Entity, Column, OneToOne } from 'typeorm';
import { Player } from 'src/modules/players/entities/player.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 36, unique: true, nullable: false })
  login: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'text', nullable: false })
  role: RoleEnum; // 'admin' yoki 'player'

  @OneToOne(() => Player, (player) => player.user)
  player: Player;
}
