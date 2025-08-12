import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { CourseModuleEntity } from './module.entity';
import { CourseService } from './course.service';
import { CourseModuleService } from './module.service';
import { CourseController } from './course.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, CourseModuleEntity])],
  providers: [CourseService, CourseModuleService],
  controllers: [CourseController],
  exports: [CourseService, CourseModuleService],
})
export class CourseModule {}


