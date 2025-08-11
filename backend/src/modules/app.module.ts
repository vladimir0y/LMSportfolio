import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from '../routes/health.controller';
import { CourseModule } from './course/course.module';
import { ScormModule } from './scorm/scorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ...(process.env.DATABASE_URL
      ? [
          TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DATABASE_URL,
            autoLoadEntities: true,
            synchronize: true,
          }),
        ]
      : []),
    CourseModule,
    ScormModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}


