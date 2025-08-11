import { Injectable } from '@nestjs/common';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ScormService {
  async listPackages(): Promise<any[]> {
    try {
      const uploadsDir = join(process.cwd(), 'uploads', 'scorm');
      const packages = [];
      
      try {
        const items = await readdir(uploadsDir);
        
        for (const item of items) {
          const itemPath = join(uploadsDir, item);
          const itemStat = await stat(itemPath);
          
          if (itemStat.isDirectory()) {
            const metadataPath = join(itemPath, '.openlms.json');
            try {
              const metadata = JSON.parse(await readFile(metadataPath, 'utf-8'));
              packages.push({
                id: item,
                filename: item,
                originalName: item,
                path: itemPath,
                launchUrl: `/public/scorm/${item}/${metadata.launch}`,
                uploadedAt: itemStat.birthtime.toISOString(),
                size: itemStat.size,
                status: 'ready'
              });
            } catch {
              packages.push({
                id: item,
                filename: item,
                originalName: item,
                path: itemPath,
                launchUrl: `/public/scorm/${item}/index.html`,
                uploadedAt: itemStat.birthtime.toISOString(),
                size: itemStat.size,
                status: 'processing'
              });
            }
          }
        }
      } catch (error) {
        // Directory doesn't exist yet
        return [];
      }
      
      return packages;
    } catch (error) {
      console.error('Error listing SCORM packages:', error);
      return [];
    }
  }

  async deletePackage(packageId: string): Promise<boolean> {
    try {
      const packagePath = join(process.cwd(), 'uploads', 'scorm', packageId);
      await rm(packagePath, { recursive: true, force: true });
      return true;
    } catch (error) {
      console.error('Error deleting SCORM package:', error);
      return false;
    }
  }
}

// Import missing functions
import { readFile, rm } from 'fs/promises';
