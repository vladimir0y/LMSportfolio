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
exports.CourseModuleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const module_entity_1 = require("./module.entity");
let CourseModuleService = class CourseModuleService {
    constructor(moduleRepo) {
        this.moduleRepo = moduleRepo;
    }
    async createModule(data) {
        var _a, _b;
        const launchUrl = `/public/scorm/${data.scormPackageId}/index_lms.html`;
        const module = this.moduleRepo.create({
            ...data,
            launchUrl,
            isRequired: (_a = data.isRequired) !== null && _a !== void 0 ? _a : true,
            enforceSequence: (_b = data.enforceSequence) !== null && _b !== void 0 ? _b : true,
        });
        return this.moduleRepo.save(module);
    }
    async getModulesByCourse(courseId) {
        return this.moduleRepo.find({
            where: { courseId },
            order: { orderIndex: 'ASC' }
        });
    }
    async associateScormPackages(courseId, packages) {
        const modules = [];
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
    async updateModuleOrder(moduleId, newOrder) {
        await this.moduleRepo.update(moduleId, { orderIndex: newOrder });
        return this.moduleRepo.findOneOrFail({ where: { id: moduleId } });
    }
    async deleteModule(moduleId) {
        await this.moduleRepo.delete(moduleId);
    }
};
exports.CourseModuleService = CourseModuleService;
exports.CourseModuleService = CourseModuleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(module_entity_1.CourseModuleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CourseModuleService);
//# sourceMappingURL=module.service.js.map