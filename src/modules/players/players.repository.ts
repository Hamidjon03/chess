import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './entities/player.entity';
import { IPlayersRepository } from './interfaces/players.repository';
import { ID } from 'src/common/types/type';

export class PlayersRepository implements IPlayersRepository {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
  ) {}

  async update(dto: Player): Promise<Player> {
    return await this.playersRepository.save(dto);
  }
  async delete(entity: Player): Promise<Player> {
    return await this.playersRepository.remove(entity);
  }

  async insert(entity: Player): Promise<Player> {
    const newPlayer = this.playersRepository.create(entity);
    await this.playersRepository.save(newPlayer);
    return newPlayer;
  }

  async findAll(): Promise<Array<Player>> {
    return await this.playersRepository.find({ relations: ['user'] });
  }

  async findOneById(id: number): Promise<Player | undefined> {
    return await this.playersRepository.findOne({ where: { id } });
  }

  async find(options: any): Promise<Player[]> {
    return await this.playersRepository.find(options);
  }

  async findByUserId(userId: ID): Promise<Player | undefined> {
    return await this.playersRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async findOneByName(name: string): Promise<Player | undefined> {
    return await this.playersRepository.findOne({ where: { name } });
  }
}
