import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(process.cwd(), 'src', '**', '*.entity.{ts,js}')],
  migrations: [join(process.cwd(), 'src', 'migrations', '*.{ts,js}')],
  synchronize: false,
  logging: true,
  ssl: {
    rejectUnauthorized: false // Required for Neon.tech
  }
};

export default new DataSource(options); 