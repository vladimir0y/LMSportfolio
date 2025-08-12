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
exports.QuizAttemptEntity = exports.QuizQuestionEntity = exports.QuizEntity = exports.QuestionType = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../curriculum/entities");
const user_entity_1 = require("../user/user.entity");
var QuestionType;
(function (QuestionType) {
    QuestionType["MULTIPLE_CHOICE"] = "multiple_choice";
    QuestionType["TRUE_FALSE"] = "true_false";
    QuestionType["SHORT_ANSWER"] = "short_answer";
    QuestionType["ESSAY"] = "essay";
    QuestionType["MATCHING"] = "matching";
    QuestionType["NUMERICAL"] = "numerical";
})(QuestionType || (exports.QuestionType = QuestionType = {}));
let QuizEntity = class QuizEntity {
};
exports.QuizEntity = QuizEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuizEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], QuizEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], QuizEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], QuizEntity.prototype, "timeLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], QuizEntity.prototype, "maxAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], QuizEntity.prototype, "shuffleQuestions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], QuizEntity.prototype, "showCorrectAnswers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], QuizEntity.prototype, "allowReview", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], QuizEntity.prototype, "passingScore", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.ActivityEntity, { nullable: true }),
    __metadata("design:type", entities_1.ActivityEntity)
], QuizEntity.prototype, "activity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => QuizQuestionEntity, (q) => q.quiz),
    __metadata("design:type", Array)
], QuizEntity.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuizEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QuizEntity.prototype, "updatedAt", void 0);
exports.QuizEntity = QuizEntity = __decorate([
    (0, typeorm_1.Entity)('quizzes')
], QuizEntity);
let QuizQuestionEntity = class QuizQuestionEntity {
};
exports.QuizQuestionEntity = QuizQuestionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuizQuestionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], QuizQuestionEntity.prototype, "questionText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: QuestionType }),
    __metadata("design:type", String)
], QuizQuestionEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], QuizQuestionEntity.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], QuizQuestionEntity.prototype, "correctAnswer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], QuizQuestionEntity.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], QuizQuestionEntity.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => QuizEntity, (q) => q.questions),
    __metadata("design:type", QuizEntity)
], QuizQuestionEntity.prototype, "quiz", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuizQuestionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QuizQuestionEntity.prototype, "updatedAt", void 0);
exports.QuizQuestionEntity = QuizQuestionEntity = __decorate([
    (0, typeorm_1.Entity)('quiz_questions')
], QuizQuestionEntity);
let QuizAttemptEntity = class QuizAttemptEntity {
};
exports.QuizAttemptEntity = QuizAttemptEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuizAttemptEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => QuizEntity),
    __metadata("design:type", QuizEntity)
], QuizAttemptEntity.prototype, "quiz", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    __metadata("design:type", user_entity_1.UserEntity)
], QuizAttemptEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], QuizAttemptEntity.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], QuizAttemptEntity.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: {} }),
    __metadata("design:type", Object)
], QuizAttemptEntity.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], QuizAttemptEntity.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], QuizAttemptEntity.prototype, "isPassed", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], QuizAttemptEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], QuizAttemptEntity.prototype, "updatedAt", void 0);
exports.QuizAttemptEntity = QuizAttemptEntity = __decorate([
    (0, typeorm_1.Entity)('quiz_attempts')
], QuizAttemptEntity);
//# sourceMappingURL=quiz.entity.js.map