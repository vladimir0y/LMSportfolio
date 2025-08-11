import { Body, Controller, Get, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

class CreateCourseDto {
  @IsString()
  @MaxLength(255)
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}

@Controller('api/courses')
export class CourseController {
  constructor(private readonly courses: CourseService) {}

  @Get()
  list() {
    return this.courses.list();
  }

  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.courses.create(dto);
  }
}


