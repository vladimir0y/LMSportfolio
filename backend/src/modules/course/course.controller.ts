import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { IsBoolean, IsOptional, IsString, MaxLength, IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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

class ScormPackageDto {
  @IsString()
  scormId!: string;

  @IsString()
  title!: string;

  @IsNumber()
  order!: number;
}

class AssociateScormModulesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScormPackageDto)
  packages!: ScormPackageDto[];
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

  @Get(':id')
  getCourse(@Param('id') id: string) {
    return this.courses.getCourseWithModules(id);
  }

  @Post(':id/modules')
  associateScormModules(
    @Param('id') courseId: string,
    @Body() dto: AssociateScormModulesDto
  ) {
    return this.courses.associateScormModules(courseId, dto.packages);
  }

  @Put(':id/publish')
  publishCourse(@Param('id') courseId: string) {
    return this.courses.publishCourse(courseId);
  }
}


