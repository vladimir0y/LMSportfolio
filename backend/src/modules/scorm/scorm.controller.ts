import { Controller, Post, Get, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ScormService } from './scorm.service';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import AdmZip from 'adm-zip';
import { XMLParser } from 'fast-xml-parser';

@Controller('api/scorm')
export class ScormController {
  constructor(private readonly scormService: ScormService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/temp',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/zip' || file.originalname.endsWith('.zip')) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only ZIP files are allowed'), false);
        }
      },
      limits: {
        fileSize: 100 * 1024 * 1024, // 100MB
      },
    }),
  )
  async uploadScorm(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const zip = new AdmZip(file.path);
      const zipEntries = zip.getEntries();
      
      // Find imsmanifest.xml
      const manifestEntry = zipEntries.find(entry => entry.entryName === 'imsmanifest.xml');
      if (!manifestEntry) {
        throw new BadRequestException('No imsmanifest.xml found in ZIP');
      }

      // Parse manifest
      const manifestContent = manifestEntry.getData().toString('utf8');
      const parser = new XMLParser({ ignoreAttributes: false });
      const manifest = parser.parse(manifestContent);

      // Extract launch file
      let launchFile = 'index.html'; // Default
      try {
        const organizations = manifest.manifest?.organizations?.organization;
        if (organizations) {
          const org = Array.isArray(organizations) ? organizations[0] : organizations;
          const items = org.item;
          if (items) {
            const firstItem = Array.isArray(items) ? items[0] : items;
            const resourceId = firstItem['@_identifierref'];
            const resources = manifest.manifest?.resources?.resource;
            if (resources) {
              const resource = Array.isArray(resources) 
                ? resources.find(r => r['@_identifier'] === resourceId)
                : resources;
              if (resource) {
                launchFile = resource['@_href'] || 'index.html';
              }
            }
          }
        }
      } catch (error) {
        console.warn('Could not parse launch file from manifest, using default');
      }

      // Create package directory
      const packageName = file.originalname.replace('.zip', '');
      const packageDir = join(process.cwd(), 'uploads', 'scorm', packageName);
      await mkdir(packageDir, { recursive: true });

      // Extract files
      zip.extractAllTo(packageDir, true);

      // Write metadata
      const metadata = {
        originalName: file.originalname,
        uploadedAt: new Date().toISOString(),
        launch: launchFile,
        manifest: manifest
      };
      
      await writeFile(
        join(packageDir, '.openlms.json'),
        JSON.stringify(metadata, null, 2)
      );

      return {
        success: true,
        packageName,
        launchUrl: `/public/scorm/${packageName}/${launchFile}`,
        message: 'SCORM package uploaded and extracted successfully'
      };
    } catch (error) {
      console.error('Error processing SCORM package:', error);
      throw new BadRequestException('Failed to process SCORM package: ' + error.message);
    }
  }

  @Get('packages')
  async listPackages() {
    return this.scormService.listPackages();
  }

  @Delete('packages/:id')
  async deletePackage(@Param('id') id: string) {
    const success = await this.scormService.deletePackage(id);
    return { success };
  }

  @Get('launch/:zip')
  async launchScorm(@Param('zip') zip: string) {
    // This endpoint can be used for additional SCORM launch logic
    return { launchUrl: `/public/scorm/${zip}/index.html` };
  }
}


