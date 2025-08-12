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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const course_entity_1 = require("./course.entity");
const module_service_1 = require("./module.service");
let CourseService = class CourseService {
    constructor(courseRepo, moduleService) {
        this.courseRepo = courseRepo;
        this.moduleService = moduleService;
    }
    list() {
        return this.courseRepo.find({ order: { createdAt: 'DESC' } });
    }
    create(data) {
        const entity = this.courseRepo.create(data);
        return this.courseRepo.save(entity);
    }
    async findById(id) {
        return this.courseRepo.findOneOrFail({
            where: { id },
            relations: ['modules']
        });
    }
    async getCourseWithModules(id) {
        return this.courseRepo.findOneOrFail({
            where: { id },
            relations: ['modules'],
            order: { modules: { orderIndex: 'ASC' } }
        });
    }
    async publishCourse(courseId, catalogFlags) {
        await this.courseRepo.update(courseId, {
            isPublished: true,
            updatedAt: new Date()
        });
        return this.findById(courseId);
    }
    async associateScormModules(courseId, scormPackages) {
        await this.findById(courseId);
        return this.moduleService.associateScormPackages(courseId, scormPackages);
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(course_entity_1.CourseEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        module_service_1.CourseModuleService])
], CourseService);
//# sourceMappingURL=course.service.js.map