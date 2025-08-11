import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity, QuizQuestionEntity, QuizAttemptEntity } from './quiz.entity';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity, QuizQuestionEntity, QuizAttemptEntity])],
  providers: [QuizService],
  controllers: [QuizController],
})
export class QuizModule {}
