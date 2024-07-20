import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './index';

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  url: `postgres://${config.database_user}:${config.database_password}@${config.database_host}:${config.database_port}/${config.database}`,
  entities: [__dirname + '/../../modules/**/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false,
};

export default new DataSource(typeormConfig);

// npm run migration:generate -- src/common/database/migrations/first
// npm run migration:run
// npm run seed:run
