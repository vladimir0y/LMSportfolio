import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity('course_modules')
export class CourseModuleEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  courseId!: string;

  @Column({ type: 'varchar', length: 255 })
  scormPackageId!: string; // References the SCORM package directory name

  @Column({ type: 'varchar', length: 255 })
  title!: string; // Module title (e.g., "Module 1: Introduction")

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'int' })
  orderIndex!: number; // Determines the sequence (1, 2, 3...)

  @Column({ type: 'boolean', default: true })
  isRequired!: boolean; // Whether completion is required to proceed

  @Column({ type: 'boolean', default: true })
  enforceSequence!: boolean; // Whether prerequisite modules must be completed first

  @Column({ type: 'varchar', length: 500, nullable: true })
  launchUrl?: string; // SCORM launch URL

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relationship to course
  @ManyToOne(() => CourseEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course!: CourseEntity;
}
