import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';

const UPLOAD_DIR = 'uploads/scorm';

function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

@Controller('api/scorm')
export class ScormController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          ensureUploadDir();
          cb(null, UPLOAD_DIR);
        },
        filename: (_req, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
    }),
  )
  upload(@UploadedFile() file?: Express.Multer.File) {
    return { ok: true, file: { filename: file?.filename, path: file?.path } };
  }

  @Get('launch/:zip')
  launch(@Param('zip') zip: string) {
    // Frontend can iframe this public URL
    return { url: `/public/scorm/${zip.replace(/\.zip$/i, '')}/index.html` };
  }
}


