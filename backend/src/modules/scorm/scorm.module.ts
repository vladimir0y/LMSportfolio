import { Module } from '@nestjs/common';
import { ScormController } from './scorm.controller';

@Module({
  controllers: [ScormController],
})
export class ScormModule {}


