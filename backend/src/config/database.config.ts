import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';

export default registerAs(
  'database',
  () =>
    ({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
      autoLoadEntities: true,
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              rejectUnauthorized: false,
            }
          : false,
    }) as DataSourceOptions,
);
