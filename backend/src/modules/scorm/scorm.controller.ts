import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'node:path';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import AdmZip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';

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
    if (!file) return { ok: false };
    // Unzip to a versioned folder under uploads/scorm/<basename>/
    const baseName = (file.originalname || 'package').replace(/\.zip$/i, '');
    const targetDir = join(UPLOAD_DIR, baseName);
    ensureUploadDir();
    const zip = new AdmZip(file.path);
    zip.extractAllTo(targetDir, true);

    // Parse imsmanifest.xml for launchable resource
    const manifestEntry = zip.getEntry('imsmanifest.xml') || zip.getEntry('imsmanifest.xml'.toUpperCase());
    let launch: string | undefined;
    if (manifestEntry) {
      const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
      const xml = manifestEntry.getData().toString('utf8');
      const doc = parser.parse(xml);
      const resources = doc?.manifest?.resources?.resource;
      const res = Array.isArray(resources) ? resources[0] : resources;
      launch = res?.href || 'index.html';
      // Save a tiny descriptor for the frontend
      writeFileSync(join(targetDir, '.openlms.json'), JSON.stringify({ launch }, null, 2));
    }

    return {
      ok: true,
      file: { filename: file.filename, path: file.path },
      launchUrl: `/public/scorm/${baseName}/${launch || 'index.html'}`,
    };
  }

  @Get('launch/:zip')
  launch(@Param('zip') zip: string) {
    // Frontend can iframe this public URL
    return { url: `/public/scorm/${zip.replace(/\.zip$/i, '')}/index.html` };
  }
}


