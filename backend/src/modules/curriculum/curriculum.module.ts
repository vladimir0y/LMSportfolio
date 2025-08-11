import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity, CategoryEntity, CourseEntity, ModuleEntity, TopicEntity } from './entities';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, CourseEntity, ModuleEntity, TopicEntity, ActivityEntity])],
  providers: [CurriculumService],
  controllers: [CurriculumController],
})
export class CurriculumModule {}


