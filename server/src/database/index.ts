import { createConnection, Connection } from 'typeorm';

import databaseConfig from '../config/database';

class Database {
  public connection: Promise<Connection>;

  constructor() {
    this.connection = createConnection(databaseConfig);
  }
}

export default new Database().connection;
