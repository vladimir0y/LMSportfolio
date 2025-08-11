import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityEntity, CategoryEntity, CourseEntity, ModuleEntity, TopicEntity } from './entities';

@Injectable()
export class CurriculumService {
  constructor(
    @InjectRepository(CategoryEntity) private readonly categories: Repository<CategoryEntity>,
    @InjectRepository(CourseEntity) private readonly courses: Repository<CourseEntity>,
    @InjectRepository(ModuleEntity) private readonly modules: Repository<ModuleEntity>,
    @InjectRepository(TopicEntity) private readonly topics: Repository<TopicEntity>,
    @InjectRepository(ActivityEntity) private readonly activities: Repository<ActivityEntity>,
  ) {}

  // Categories
  listCategories() { return this.categories.find({ order: { name: 'ASC' } }); }
  createCategory(data: Partial<CategoryEntity>) { return this.categories.save(this.categories.create(data)); }

  // Courses
  listCourses() { return this.courses.find({ order: { createdAt: 'DESC' }, relations: ['category'] }); }
  createCourse(data: Partial<CourseEntity>) { return this.courses.save(this.courses.create(data)); }

  // Modules
  listModules(courseId: string) { return this.modules.find({ where: { course: { id: courseId } }, relations: ['course'] }); }
  createModule(courseId: string, data: Partial<ModuleEntity>) { return this.modules.save(this.modules.create({ ...data, course: { id: courseId } as CourseEntity })); }

  // Topics
  listTopics(moduleId: string) { return this.topics.find({ where: { module: { id: moduleId } }, relations: ['module'] }); }
  createTopic(moduleId: string, data: Partial<TopicEntity>) { return this.topics.save(this.topics.create({ ...data, module: { id: moduleId } as ModuleEntity })); }

  // Activities
  listActivities(topicId: string) { return this.activities.find({ where: { topic: { id: topicId } }, relations: ['topic'] }); }
  createActivity(topicId: string, data: Partial<ActivityEntity>) { return this.activities.save(this.activities.create({ ...data, topic: { id: topicId } as TopicEntity })); }
}


