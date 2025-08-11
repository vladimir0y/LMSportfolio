import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 120 }) name!: string;
  @Column({ nullable: true }) description?: string;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}

@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 255 }) title!: string;
  @Column({ type: 'text', nullable: true }) description?: string;
  @Column({ default: true }) isPublished!: boolean;
  @ManyToOne(() => CategoryEntity, { nullable: true }) category?: CategoryEntity | null;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
  @OneToMany(() => ModuleEntity, (m) => m.course) modules!: ModuleEntity[];
  @ManyToMany(() => UserEntity, (user) => user.enrolledCourses)
  @JoinTable({
    name: 'course_enrollments',
    joinColumn: { name: 'courseId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  enrolledUsers!: UserEntity[];
}

@Entity('modules')
export class ModuleEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 255 }) title!: string;
  @ManyToOne(() => CourseEntity, (c) => c.modules) course!: CourseEntity;
  @OneToMany(() => TopicEntity, (t) => t.module) topics!: TopicEntity[];
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}

@Entity('topics')
export class TopicEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 255 }) title!: string;
  @ManyToOne(() => ModuleEntity, (m) => m.topics) module!: ModuleEntity;
  @OneToMany(() => ActivityEntity, (a) => a.topic) activities!: ActivityEntity[];
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}

export type ActivityType = 'scorm' | 'quiz' | 'video' | 'pdf' | 'survey' | 'forum' | 'html5';

@Entity('activities')
export class ActivityEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column({ length: 255 }) title!: string;
  @ManyToOne(() => TopicEntity, (t) => t.activities) topic!: TopicEntity;
  @Column({ type: 'varchar', length: 20 }) type!: ActivityType;
  @Column({ type: 'jsonb', default: {} }) settings!: Record<string, unknown>;
  @Column({ default: true }) isVisible!: boolean;
  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}


