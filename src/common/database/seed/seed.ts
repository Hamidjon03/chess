import { RoleEnum } from 'src/common/enums/enum';
import { DataSource } from 'typeorm';
import { typeormConfig } from '../../../common/config/typeorm.config';
import { BcryptHashing } from 'src/lib/bcrypt';
import { User } from 'src/modules/users/entities/user.entity';
import { Player } from 'src/modules/players/entities/player.entity';

(async () => {
  const datasource: DataSource = new DataSource(typeormConfig);
  await datasource.initialize();
  const queryRunner = datasource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const userRepository = queryRunner.manager.getRepository(User);
    const playerRepository = queryRunner.manager.getRepository(Player);

    // Remove existing users and players
    const users = await userRepository.find();
    await userRepository.remove(users);

    const players = await playerRepository.find();
    await playerRepository.remove(players);

    // Create users
    const hashedPassword = await BcryptHashing.hash('test');
    const user1 = userRepository.create({
      login: 'test1',
      username: 'test1',
      role: RoleEnum.ADMIN,
      password: hashedPassword,
    });

    const user2 = userRepository.create({
      login: 'test2',
      username: 'test2',
      role: RoleEnum.PLAYER,
      password: hashedPassword,
    });

    const user3 = userRepository.create({
      login: 'test3',
      username: 'test3',
      role: RoleEnum.PLAYER,
      password: hashedPassword,
    });

    const user4 = userRepository.create({
      login: 'test4',
      username: 'test4',
      role: RoleEnum.PLAYER,
      password: hashedPassword,
    });

    // Save new users
    await userRepository.save([user1, user2, user3, user4]);

    // Create players
    const player1 = playerRepository.create({
      name: 'John Doe',
      age: 25,
      rating: 1500,
      country: 'USA',
      user: user1,
    });

    const player2 = playerRepository.create({
      name: 'Leao',
      age: 25,
      rating: 3400,
      country: 'PORTUGAL',
      user: user2,
    });

    const player3 = playerRepository.create({
      name: 'Kim',
      age: 25,
      rating: 4000,
      country: 'KOREA',
      user: user3,
    });

    const player4 = playerRepository.create({
      name: 'Mansur',
      age: 25,
      rating: 5100,
      country: 'UZB',
      user: user4,
    });

    // Save new players
    await playerRepository.save([player1, player2, player3, player4]);

    await queryRunner.commitTransaction();
  } catch (err) {
    console.error(err);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
    await datasource.destroy();
  }
})();
