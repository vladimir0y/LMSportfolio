"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurriculumService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("./entities");
let CurriculumService = class CurriculumService {
    constructor(categories, courses, modules, topics, activities) {
        this.categories = categories;
        this.courses = courses;
        this.modules = modules;
        this.topics = topics;
        this.activities = activities;
    }
    listCategories() { return this.categories.find({ order: { name: 'ASC' } }); }
    createCategory(data) { return this.categories.save(this.categories.create(data)); }
    listCourses() { return this.courses.find({ order: { createdAt: 'DESC' }, relations: ['category'] }); }
    createCourse(data) { return this.courses.save(this.courses.create(data)); }
    listModules(courseId) { return this.modules.find({ where: { course: { id: courseId } }, relations: ['course'] }); }
    createModule(courseId, data) { return this.modules.save(this.modules.create({ ...data, course: { id: courseId } })); }
    listTopics(moduleId) { return this.topics.find({ where: { module: { id: moduleId } }, relations: ['module'] }); }
    createTopic(moduleId, data) { return this.topics.save(this.topics.create({ ...data, module: { id: moduleId } })); }
    listActivities(topicId) { return this.activities.find({ where: { topic: { id: topicId } }, relations: ['topic'] }); }
    createActivity(topicId, data) { return this.activities.save(this.activities.create({ ...data, topic: { id: topicId } })); }
};
exports.CurriculumService = CurriculumService;
exports.CurriculumService = CurriculumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.CategoryEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.CourseEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.ModuleEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.TopicEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.ActivityEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CurriculumService);
//# sourceMappingURL=curriculum.service.js.map