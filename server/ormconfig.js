const path = require('path');

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    path.resolve(__dirname, 'src', 'database', 'entity', '**', '*.ts'),
  ],
  migrations: [
    path.resolve(__dirname, 'src', 'database', 'migration', '**', '*.ts'),
  ],
  subscribers: [
    path.resolve(__dirname, 'src', 'database', 'subscriber', '**', '*.ts'),
  ],
  cli: {
    entitiesDir: path.resolve(__dirname, 'src', 'database', 'entity'),
    migrationsDir: path.resolve(__dirname, 'src', 'database', 'migration'),
    subscribersDir: path.resolve(__dirname, 'src', 'database', 'subscriber'),
  },
};
