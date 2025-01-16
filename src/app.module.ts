import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesModule } from './modules/modules.module';
import { HelpersModule } from './helpers/helpers.module';
import configuration from './config/configuration';
import { CronTasksModule } from './cron-tasks/cron-tasks.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        process.stdout.write(`connected db in ${configuration().env} mode \n`);
        return {
          type: 'postgres' as const,
          host: configuration().database.host,
          port: configuration().database.port,
          username: configuration().database.username,
          password: configuration().database.password,
          database: configuration().database.name,
          entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
          synchronize: true,
          logging: ['local', 'development'].includes(configuration().env.toLowerCase()),
        };
      },
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ModulesModule,
    HelpersModule,
    CronTasksModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
