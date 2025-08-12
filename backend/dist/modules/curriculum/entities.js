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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityEntity = exports.TopicEntity = exports.ModuleEntity = exports.CourseEntity = exports.CategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
let CategoryEntity = class CategoryEntity {
};
exports.CategoryEntity = CategoryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120 }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CategoryEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CategoryEntity.prototype, "updatedAt", void 0);
exports.CategoryEntity = CategoryEntity = __decorate([
    (0, typeorm_1.Entity)('categories')
], CategoryEntity);
let CourseEntity = class CourseEntity {
};
exports.CourseEntity = CourseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CourseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], CourseEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CourseEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], CourseEntity.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CategoryEntity, { nullable: true }),
    __metadata("design:type", Object)
], CourseEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CourseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CourseEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ModuleEntity, (m) => m.course),
    __metadata("design:type", Array)
], CourseEntity.prototype, "modules", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, (user) => user.enrolledCourses),
    (0, typeorm_1.JoinTable)({
        name: 'course_enrollments',
        joinColumn: { name: 'courseId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], CourseEntity.prototype, "enrolledUsers", void 0);
exports.CourseEntity = CourseEntity = __decorate([
    (0, typeorm_1.Entity)('courses')
], CourseEntity);
let ModuleEntity = class ModuleEntity {
};
exports.ModuleEntity = ModuleEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ModuleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], ModuleEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CourseEntity, (c) => c.modules),
    __metadata("design:type", CourseEntity)
], ModuleEntity.prototype, "course", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TopicEntity, (t) => t.module),
    __metadata("design:type", Array)
], ModuleEntity.prototype, "topics", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ModuleEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ModuleEntity.prototype, "updatedAt", void 0);
exports.ModuleEntity = ModuleEntity = __decorate([
    (0, typeorm_1.Entity)('modules')
], ModuleEntity);
let TopicEntity = class TopicEntity {
};
exports.TopicEntity = TopicEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TopicEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], TopicEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ModuleEntity, (m) => m.topics),
    __metadata("design:type", ModuleEntity)
], TopicEntity.prototype, "module", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ActivityEntity, (a) => a.topic),
    __metadata("design:type", Array)
], TopicEntity.prototype, "activities", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TopicEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TopicEntity.prototype, "updatedAt", void 0);
exports.TopicEntity = TopicEntity = __decorate([
    (0, typeorm_1.Entity)('topics')
], TopicEntity);
let ActivityEntity = class ActivityEntity {
};
exports.ActivityEntity = ActivityEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ActivityEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], ActivityEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TopicEntity, (t) => t.activities),
    __metadata("design:type", TopicEntity)
], ActivityEntity.prototype, "topic", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], ActivityEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], ActivityEntity.prototype, "settings", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ActivityEntity.prototype, "isVisible", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ActivityEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ActivityEntity.prototype, "updatedAt", void 0);
exports.ActivityEntity = ActivityEntity = __decorate([
    (0, typeorm_1.Entity)('activities')
], ActivityEntity);
//# sourceMappingURL=entities.js.map