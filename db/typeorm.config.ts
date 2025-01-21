import { ConfigService, registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: `admin`,
  password: `796163`,
  database: `insta`,
  entities: [`${__dirname}/../apps/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  // autoLoadEntities: true,
  // synchronize: false,
});
