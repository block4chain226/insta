export default () => ({
  database: {
    type: process.env.POSTGRES_TYPE,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRESQL_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
    // autoLoadEntities: true,
    // synchronize: true,pt
    migrationsTableName: 'migrations',
  },
  test_database: {
    type: process.env.TEST_POSTGRES_TYPE,
    host: process.env.TEST_POSTGRES_HOST,
    port: process.env.TEST_POSTGRES_PORT,
    username: process.env.TEST_POSTGRES_USERNAME,
    password: process.env.TEST_POSTGRES_PASSWORD,
    database: process.env.TEST_POSTGRES_DATABASE,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
    // autoLoadEntities: true,
    synchronize: true,
    migrationsTableName: 'migrations',
  },
});
