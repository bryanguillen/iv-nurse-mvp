import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { OrganizationUuidModule } from './organization-uuid/organization-uuid.module';
import { NurseUuidModule } from './nurse-uuid/nurse-uuid.module';
import { NurseAvailabilityModule } from './nurse-availability/nurse-availability.module';
import databaseConfig from './config/database.config';
import { SupabaseAuthGuard } from './auth/supabase-auth.guard';
import { NurseServiceModule } from './nurse-service/nurse-service.module';
import { PersonUuidModule } from './person-uuid/person-uuid.module';
import { BookingModule } from './booking/booking.module';
import { NurseStatsModule } from './nurse-stats/nurse-stats.module';
import { logger } from './config/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return dbConfig;
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      introspection: true,
      context: ({ req }) => {
        const operation = req.body?.operationName || 'UnnamedOperation';

        logger.log(`Incoming GraphQL: ${operation}`);

        return { req }; // Attach request to context for auth
      },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 50,
      },
    ]),
    NurseUuidModule,
    OrganizationUuidModule,
    NurseAvailabilityModule,
    NurseServiceModule,
    PersonUuidModule,
    BookingModule,
    NurseStatsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SupabaseAuthGuard,
    },
  ],
})
export class AppModule {}
