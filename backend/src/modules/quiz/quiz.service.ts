import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizEntity, QuizQuestionEntity, QuizAttemptEntity, QuestionType } from './quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizzes: Repository<QuizEntity>,
    @InjectRepository(QuizQuestionEntity)
    private readonly questions: Repository<QuizQuestionEntity>,
    @InjectRepository(QuizAttemptEntity)
    private readonly attempts: Repository<QuizAttemptEntity>,
  ) {}

  async createQuiz(data: Partial<QuizEntity>): Promise<QuizEntity> {
    return this.quizzes.save(this.quizzes.create(data));
  }

  async findQuizById(id: string): Promise<QuizEntity | null> {
    return this.quizzes.findOne({ 
      where: { id },
      relations: ['questions', 'activity']
    });
  }

  async listQuizzes(): Promise<QuizEntity[]> {
    return this.quizzes.find({ 
      relations: ['activity'],
      order: { createdAt: 'DESC' }
    });
  }

  async updateQuiz(id: string, data: Partial<QuizEntity>): Promise<QuizEntity | null> {
    await this.quizzes.update(id, data);
    return this.findQuizById(id);
  }

  async deleteQuiz(id: string): Promise<boolean> {
    const result = await this.quizzes.delete(id);
    return result.affected > 0;
  }

  async addQuestion(quizId: string, data: Partial<QuizQuestionEntity>): Promise<QuizQuestionEntity> {
    const question = this.questions.create({
      ...data,
      quiz: { id: quizId } as QuizEntity,
    });
    return this.questions.save(question);
  }

  async updateQuestion(id: string, data: Partial<QuizQuestionEntity>): Promise<QuizQuestionEntity | null> {
    await this.questions.update(id, data);
    return this.questions.findOne({ where: { id } });
  }

  async deleteQuestion(id: string): Promise<boolean> {
    const result = await this.questions.delete(id);
    return result.affected > 0;
  }

  async startQuizAttempt(quizId: string, userId: string): Promise<QuizAttemptEntity> {
    const attempt = this.attempts.create({
      quiz: { id: quizId } as QuizEntity,
      user: { id: userId } as any,
      startedAt: new Date(),
      answers: {},
      score: 0,
      isPassed: false,
    });
    return this.attempts.save(attempt);
  }

  async submitQuizAttempt(attemptId: string, answers: Record<string, unknown>): Promise<QuizAttemptEntity | null> {
    const attempt = await this.attempts.findOne({ 
      where: { id: attemptId },
      relations: ['quiz', 'quiz.questions']
    });

    if (!attempt) return null;

    // Calculate score based on answers
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

  async getUserAttempts(userId: string): Promise<QuizAttemptEntity[]> {
    return this.attempts.find({
      where: { user: { id: userId } },
      relations: ['quiz'],
      order: { createdAt: 'DESC' }
    });
  }

  private isAnswerCorrect(question: QuizQuestionEntity, userAnswer: unknown): boolean {
    // Simple answer checking - can be enhanced for different question types
    return JSON.stringify(question.correctAnswer) === JSON.stringify(userAnswer);
  }
}
