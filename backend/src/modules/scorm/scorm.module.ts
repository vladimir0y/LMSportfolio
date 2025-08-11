import { Module } from '@nestjs/common';
import { ScormController } from './scorm.controller';
import { ScormService } from './scorm.service';

@Module({
  controllers: [ScormController],
  providers: [ScormService],
})
export class ScormModule {}


