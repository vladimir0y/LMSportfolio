import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseModuleEntity } from './module.entity';

export interface CreateModuleDto {
  courseId: string;
  scormPackageId: string;
  title: string;
  description?: string;
  orderIndex: number;
  isRequired?: boolean;
  enforceSequence?: boolean;
}

@Injectable()
export class CourseModuleService {
  constructor(
    @InjectRepository(CourseModuleEntity)
    private readonly moduleRepo: Repository<CourseModuleEntity>,
  ) {}

  async createModule(data: CreateModuleDto): Promise<CourseModuleEntity> {
    // Generate launch URL for SCORM package
    const launchUrl = `/public/scorm/${data.scormPackageId}/index_lms.html`;
    
    const module = this.moduleRepo.create({
      ...data,
      launchUrl,
      isRequired: data.isRequired ?? true,
      enforceSequence: data.enforceSequence ?? true,
    });

    return this.moduleRepo.save(module);
  }

  async getModulesByCourse(courseId: string): Promise<CourseModuleEntity[]> {
    return this.moduleRepo.find({
      where: { courseId },
      order: { orderIndex: 'ASC' }
    });
  }

  async associateScormPackages(
    courseId: string,
    packages: Array<{ scormId: string; title: string; order: number }>
  ): Promise<CourseModuleEntity[]> {
    const modules: CourseModuleEntity[] = [];

    for (const pkg of packages) {
      const module = await this.createModule({
        courseId,
        scormPackageId: pkg.scormId,
        title: pkg.title,
        orderIndex: pkg.order,
        isRequired: true,
        enforceSequence: true
      });
      modules.push(module);
    }

    return modules;
  }

  async updateModuleOrder(moduleId: string, newOrder: number): Promise<CourseModuleEntity> {
    await this.moduleRepo.update(moduleId, { orderIndex: newOrder });
    return this.moduleRepo.findOneOrFail({ where: { id: moduleId } });
  }

  async deleteModule(moduleId: string): Promise<void> {
    await this.moduleRepo.delete(moduleId);
  }
}
