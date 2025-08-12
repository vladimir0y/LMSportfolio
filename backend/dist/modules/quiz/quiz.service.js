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
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const quiz_entity_1 = require("./quiz.entity");
let QuizService = class QuizService {
    constructor(quizzes, questions, attempts) {
        this.quizzes = quizzes;
        this.questions = questions;
        this.attempts = attempts;
    }
    async createQuiz(data) {
        return this.quizzes.save(this.quizzes.create(data));
    }
    async findQuizById(id) {
        return this.quizzes.findOne({
            where: { id },
            relations: ['questions', 'activity']
        });
    }
    async listQuizzes() {
        return this.quizzes.find({
            relations: ['activity'],
            order: { createdAt: 'DESC' }
        });
    }
    async updateQuiz(id, data) {
        await this.quizzes.update(id, data);
        return this.findQuizById(id);
    }
    async deleteQuiz(id) {
        const result = await this.quizzes.delete(id);
        return result.affected > 0;
    }
    async addQuestion(quizId, data) {
        const question = this.questions.create({
            ...data,
            quiz: { id: quizId },
        });
        return this.questions.save(question);
    }
    async updateQuestion(id, data) {
        await this.questions.update(id, data);
        return this.questions.findOne({ where: { id } });
    }
    async deleteQuestion(id) {
        const result = await this.questions.delete(id);
        return result.affected > 0;
    }
    async startQuizAttempt(quizId, userId) {
        const attempt = this.attempts.create({
            quiz: { id: quizId },
            user: { id: userId },
            startedAt: new Date(),
            answers: {},
            score: 0,
            isPassed: false,
        });
        return this.attempts.save(attempt);
    }
    async submitQuizAttempt(attemptId, answers) {
        const attempt = await this.attempts.findOne({
            where: { id: attemptId },
            relations: ['quiz', 'quiz.questions']
        });
        if (!attempt)
            return null;
        let score = 0;
        let totalPoints = 0;
        for (const question of attempt.quiz.questions) {
            totalPoints += question.points;
            if (this.isAnswerCorrect(question, answers[question.id])) {
                score += question.points;
            }
        }
        const percentage = totalPoints > 0 ? (score / totalPoints) * 100 : 0;
        const isPassed = percentage >= (attempt.quiz.passingScore || 70);
        await this.attempts.update(attemptId, {
            answers,
            score: Math.round(percentage),
            isPassed,
            completedAt: new Date(),
        });
        return this.attempts.findOne({ where: { id: attemptId } });
    }
    async getUserAttempts(userId) {
        return this.attempts.find({
            where: { user: { id: userId } },
            relations: ['quiz'],
            order: { createdAt: 'DESC' }
        });
    }
    isAnswerCorrect(question, userAnswer) {
        return JSON.stringify(question.correctAnswer) === JSON.stringify(userAnswer);
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(quiz_entity_1.QuizEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(quiz_entity_1.QuizQuestionEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(quiz_entity_1.QuizAttemptEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], QuizService);
//# sourceMappingURL=quiz.service.js.map