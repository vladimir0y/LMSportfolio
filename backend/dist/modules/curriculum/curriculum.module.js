"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurriculumModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const curriculum_service_1 = require("./curriculum.service");
const curriculum_controller_1 = require("./curriculum.controller");
let CurriculumModule = class CurriculumModule {
};
exports.CurriculumModule = CurriculumModule;
exports.CurriculumModule = CurriculumModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.CategoryEntity, entities_1.CourseEntity, entities_1.ModuleEntity, entities_1.TopicEntity, entities_1.ActivityEntity])],
        providers: [curriculum_service_1.CurriculumService],
        controllers: [curriculum_controller_1.CurriculumController],
    })
], CurriculumModule);
//# sourceMappingURL=curriculum.module.js.map