import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ActivityEntity } from '../curriculum/entities';
import { UserEntity } from '../user/user.entity';

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  SHORT_ANSWER = 'short_answer',
  ESSAY = 'essay',
  MATCHING = 'matching',
  NUMERICAL = 'numerical',
}

@Entity('quizzes')
export class QuizEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int', default: 0 })
  timeLimit!: number; // in minutes, 0 = no limit

  @Column({ type: 'int', default: 1 })
  maxAttempts!: number;

  @Column({ type: 'boolean', default: false })
  shuffleQuestions!: boolean;

  @Column({ type: 'boolean', default: false })
  showCorrectAnswers!: boolean;

  @Column({ type: 'boolean', default: false })
  allowReview!: boolean;

  @Column({ type: 'int', default: 0 })
  passingScore!: number; // percentage

  @ManyToOne(() => ActivityEntity, { nullable: true })
  activity?: ActivityEntity;

  @OneToMany(() => QuizQuestionEntity, (q) => q.quiz)
  questions!: QuizQuestionEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity('quiz_questions')
export class QuizQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  questionText!: string;

  @Column({ type: 'enum', enum: QuestionType })
  type!: QuestionType;

  @Column({ type: 'jsonb', default: {} })
  options!: Record<string, unknown>; // For multiple choice, matching, etc.

  @Column({ type: 'jsonb', default: {} })
  correctAnswer!: Record<string, unknown>;

  @Column({ type: 'int', default: 1 })
  points!: number;

  @Column({ type: 'text', nullable: true })
  feedback?: string;

  @ManyToOne(() => QuizEntity, (q) => q.questions)
  quiz!: QuizEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

@Entity('quiz_attempts')
export class QuizAttemptEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => QuizEntity)
  quiz!: QuizEntity;

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @Column({ type: 'timestamp' })
  startedAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt?: Date;

  @Column({ type: 'jsonb', default: {} })
  answers!: Record<string, unknown>;

  @Column({ type: 'int', default: 0 })
  score!: number;

  @Column({ type: 'boolean', default: false })
  isPassed!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
