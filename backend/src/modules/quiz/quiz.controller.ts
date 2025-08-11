import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { QuizService } from './quiz.service';
import { QuestionType } from './quiz.entity';

class CreateQuizDto {
  @IsString()
  @MaxLength(255)
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  timeLimit?: number;

  @IsNumber()
  @IsOptional()
  maxAttempts?: number;

  @IsBoolean()
  @IsOptional()
  shuffleQuestions?: boolean;

  @IsBoolean()
  @IsOptional()
  showCorrectAnswers?: boolean;

  @IsBoolean()
  @IsOptional()
  allowReview?: boolean;

  @IsNumber()
  @IsOptional()
  passingScore?: number;
}

class CreateQuestionDto {
  @IsString()
  questionText!: string;

  @IsEnum(QuestionType)
  type!: QuestionType;

  @IsString()
  @IsOptional()
  options?: string;

  @IsString()
  @IsOptional()
  correctAnswer?: string;

  @IsNumber()
  @IsOptional()
  points?: number;

  @IsString()
  @IsOptional()
  feedback?: string;
}

class SubmitQuizDto {
  @IsString()
  answers!: Record<string, unknown>;
}

@Controller('api/quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async listQuizzes() {
    return this.quizService.listQuizzes();
  }

  @Get(':id')
  async getQuiz(@Param('id') id: string) {
    return this.quizService.findQuizById(id);
  }

  @Post()
  async createQuiz(@Body() dto: CreateQuizDto) {
    return this.quizService.createQuiz(dto);
  }

  @Put(':id')
  async updateQuiz(@Param('id') id: string, @Body() dto: CreateQuizDto) {
    return this.quizService.updateQuiz(id, dto);
  }

  @Delete(':id')
  async deleteQuiz(@Param('id') id: string) {
    const success = await this.quizService.deleteQuiz(id);
    return { success };
  }

  @Post(':id/questions')
  async addQuestion(@Param('id') quizId: string, @Body() dto: CreateQuestionDto) {
    return this.quizService.addQuestion(quizId, dto);
  }

  @Put('questions/:id')
  async updateQuestion(@Param('id') id: string, @Body() dto: CreateQuestionDto) {
    return this.quizService.updateQuestion(id, dto);
  }

  @Delete('questions/:id')
  async deleteQuestion(@Param('id') id: string) {
    const success = await this.quizService.deleteQuestion(id);
    return { success };
  }

  @Post(':id/start')
  async startQuiz(@Param('id') quizId: string, @Body() body: { userId: string }) {
    return this.quizService.startQuizAttempt(quizId, body.userId);
  }

  @Post('attempts/:id/submit')
  async submitQuiz(@Param('id') attemptId: string, @Body() dto: SubmitQuizDto) {
    return this.quizService.submitQuizAttempt(attemptId, dto.answers);
  }

  @Get('users/:userId/attempts')
  async getUserAttempts(@Param('userId') userId: string) {
    return this.quizService.getUserAttempts(userId);
  }
}
