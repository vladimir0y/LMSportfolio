import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserRole, UserStatus } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}

  async createUser(data: Partial<UserEntity>): Promise<UserEntity> {
    if (data.passwordHash) {
      data.passwordHash = await bcrypt.hash(data.passwordHash, 10);
    }
    return this.users.save(this.users.create(data));
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.users.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.users.findOne({ where: { email } });
  }

  async listUsers(): Promise<UserEntity[]> {
    return this.users.find({ order: { createdAt: 'DESC' } });
  }

  async updateUser(id: string, data: Partial<UserEntity>): Promise<UserEntity | null> {
    if (data.passwordHash) {
      data.passwordHash = await bcrypt.hash(data.passwordHash, 10);
    }
    await this.users.update(id, data);
    return this.findById(id);
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.users.delete(id);
    return result.affected > 0;
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.users.update(id, { lastLoginAt: new Date() });
  }

  async enrollInCourse(userId: string, courseId: string): Promise<void> {
    // Implementation for course enrollment
  }

  async getEnrolledCourses(userId: string): Promise<any[]> {
    // Implementation for getting enrolled courses
    return [];
  }
}
