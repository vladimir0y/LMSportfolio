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
exports.CurriculumController = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const curriculum_service_1 = require("./curriculum.service");
class CategoryDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CategoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CategoryDto.prototype, "description", void 0);
class CourseDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CourseDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CourseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CourseDto.prototype, "isPublished", void 0);
class ModuleDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], ModuleDto.prototype, "title", void 0);
class TopicDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], TopicDto.prototype, "title", void 0);
class ActivityDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], ActivityDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ActivityDto.prototype, "type", void 0);
let CurriculumController = class CurriculumController {
    constructor(svc) {
        this.svc = svc;
    }
    listCategories() { return this.svc.listCategories(); }
    createCategory(dto) { return this.svc.createCategory(dto); }
    listCourses() { return this.svc.listCourses(); }
    createCourse(dto) { return this.svc.createCourse(dto); }
    listModules(courseId) { return this.svc.listModules(courseId); }
    createModule(courseId, dto) { return this.svc.createModule(courseId, dto); }
    listTopics(moduleId) { return this.svc.listTopics(moduleId); }
    createTopic(moduleId, dto) { return this.svc.createTopic(moduleId, dto); }
    listActivities(topicId) { return this.svc.listActivities(topicId); }
    createActivity(topicId, dto) { return this.svc.createActivity(topicId, dto); }
};
exports.CurriculumController = CurriculumController;
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "listCategories", null);
__decorate([
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoryDto]),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('courses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "listCourses", null);
__decorate([
    (0, common_1.Post)('courses'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CourseDto]),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Get)('courses/:courseId/modules'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "listModules", null);
__decorate([
    (0, common_1.Post)('courses/:courseId/modules'),
    __param(0, (0, common_1.Param)('courseId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ModuleDto]),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "createModule", null);
__decorate([
    (0, common_1.Get)('modules/:moduleId/topics'),
    __param(0, (0, common_1.Param)('moduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "listTopics", null);
__decorate([
    (0, common_1.Post)('modules/:moduleId/topics'),
    __param(0, (0, common_1.Param)('moduleId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, TopicDto]),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "createTopic", null);
__decorate([
    (0, common_1.Get)('topics/:topicId/activities'),
    __param(0, (0, common_1.Param)('topicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "listActivities", null);
__decorate([
    (0, common_1.Post)('topics/:topicId/activities'),
    __param(0, (0, common_1.Param)('topicId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ActivityDto]),
    __metadata("design:returntype", void 0)
], CurriculumController.prototype, "createActivity", null);
exports.CurriculumController = CurriculumController = __decorate([
    (0, common_1.Controller)('api/curriculum'),
    __metadata("design:paramtypes", [curriculum_service_1.CurriculumService])
], CurriculumController);
//# sourceMappingURL=curriculum.controller.js.map