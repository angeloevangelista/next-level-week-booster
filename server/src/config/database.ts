import { resolve } from 'path';
import { ConnectionOptions } from 'typeorm';

const options: ConnectionOptions = {
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    resolve(__dirname, '..', 'database', 'entity', '**', '*.ts'),
  ],
  migrations: [
    resolve(__dirname, '..', 'database', 'migration', '**', '*.ts'),
  ],
  subscribers: [
    resolve(__dirname, '..', 'database', 'subscriber', '**', '*.ts'),
  ],
  cli: {
    entitiesDir: resolve(__dirname, '..', 'database', 'entity'),
    migrationsDir: resolve(__dirname, '..', 'database', 'migration'),
    subscribersDir: resolve(__dirname, '..', 'database', 'subscriber'),
  },
};

export default options;
