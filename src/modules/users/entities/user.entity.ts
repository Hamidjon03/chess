import { RoleEnum } from 'src/common/enums/enum';
import { BaseEntity } from 'src/common/database/baseEntity';
import { Entity, Column } from 'typeorm';

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
}
