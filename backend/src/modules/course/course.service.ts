import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from './course.entity';
import { CourseModuleService } from './module.service';
import { CourseModuleEntity } from './module.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepo: Repository<CourseEntity>,
    private readonly moduleService: CourseModuleService,
  ) {}

  list() {
    return this.courseRepo.find({ order: { createdAt: 'DESC' } });
  }

  create(data: Partial<CourseEntity>) {
    const entity = this.courseRepo.create(data);
    return this.courseRepo.save(entity);
  }

  async findById(id: string): Promise<CourseEntity> {
    return this.courseRepo.findOneOrFail({ 
      where: { id },
      relations: ['modules'] 
    });
  }

  async getCourseWithModules(id: string): Promise<CourseEntity> {
    return this.courseRepo.findOneOrFail({
      where: { id },
      relations: ['modules'],
      order: { modules: { orderIndex: 'ASC' } }
    });
  }

  async publishCourse(courseId: string, catalogFlags?: any): Promise<CourseEntity> {
    await this.courseRepo.update(courseId, { 
      isPublished: true,
      updatedAt: new Date()
    });
    
    // Here you could add catalog/enrollment flag logic specific to your LMS
    // For now, we'll just return the updated course
    return this.findById(courseId);
  }

  async associateScormModules(
    courseId: string, 
    scormPackages: Array<{ scormId: string; title: string; order: number }>
  ): Promise<CourseModuleEntity[]> {
    // First verify the course exists
    await this.findById(courseId);
    
    // Associate SCORM packages as modules
    return this.moduleService.associateScormPackages(courseId, scormPackages);
  }
}


