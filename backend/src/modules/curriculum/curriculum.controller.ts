import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { CurriculumService } from './curriculum.service';

class CategoryDto { @IsString() @MaxLength(120) name!: string; @IsString() @IsOptional() description?: string }
class CourseDto { @IsString() @MaxLength(255) title!: string; @IsString() @IsOptional() description?: string; @IsBoolean() @IsOptional() isPublished?: boolean; }
class ModuleDto { @IsString() @MaxLength(255) title!: string }
class TopicDto { @IsString() @MaxLength(255) title!: string }
class ActivityDto { @IsString() @MaxLength(255) title!: string; @IsString() type!: string; }

@Controller('api/curriculum')
export class CurriculumController {
  constructor(private readonly svc: CurriculumService) {}

  // Categories
  @Get('categories') listCategories() { return this.svc.listCategories(); }
  @Post('categories') createCategory(@Body() dto: CategoryDto) { return this.svc.createCategory(dto); }

  // Courses
  @Get('courses') listCourses() { return this.svc.listCourses(); }
  @Post('courses') createCourse(@Body() dto: CourseDto) { return this.svc.createCourse(dto); }

  // Modules
  @Get('courses/:courseId/modules') listModules(@Param('courseId') courseId: string) { return this.svc.listModules(courseId); }
  @Post('courses/:courseId/modules') createModule(@Param('courseId') courseId: string, @Body() dto: ModuleDto) { return this.svc.createModule(courseId, dto); }

  // Topics
  @Get('modules/:moduleId/topics') listTopics(@Param('moduleId') moduleId: string) { return this.svc.listTopics(moduleId); }
  @Post('modules/:moduleId/topics') createTopic(@Param('moduleId') moduleId: string, @Body() dto: TopicDto) { return this.svc.createTopic(moduleId, dto); }

  // Activities
  @Get('topics/:topicId/activities') listActivities(@Param('topicId') topicId: string) { return this.svc.listActivities(topicId); }
  @Post('topics/:topicId/activities') createActivity(@Param('topicId') topicId: string, @Body() dto: ActivityDto) { return this.svc.createActivity(topicId, dto); }
}


