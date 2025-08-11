import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseEntity } from './course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepo: Repository<CourseEntity>,
  ) {}

  list() {
    return this.courseRepo.find({ order: { createdAt: 'DESC' } });
  }

  create(data: Partial<CourseEntity>) {
    const entity = this.courseRepo.create(data);
    return this.courseRepo.save(entity);
  }
}


