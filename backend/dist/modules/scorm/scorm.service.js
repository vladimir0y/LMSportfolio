"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScormService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("fs/promises");
const path_1 = require("path");
let ScormService = class ScormService {
    async listPackages() {
        try {
            const uploadsDir = (0, path_1.join)(process.cwd(), 'uploads', 'scorm');
            const packages = [];
            try {
                const items = await (0, promises_1.readdir)(uploadsDir);
                for (const item of items) {
                    const itemPath = (0, path_1.join)(uploadsDir, item);
                    const itemStat = await (0, promises_1.stat)(itemPath);
                    if (itemStat.isDirectory()) {
                        const metadataPath = (0, path_1.join)(itemPath, '.openlms.json');
                        try {
                            const metadata = JSON.parse(await (0, promises_2.readFile)(metadataPath, 'utf-8'));
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
                        }
                        catch {
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
            }
            catch (error) {
                return [];
            }
            return packages;
        }
        catch (error) {
            console.error('Error listing SCORM packages:', error);
            return [];
        }
    }
    async deletePackage(packageId) {
        try {
            const packagePath = (0, path_1.join)(process.cwd(), 'uploads', 'scorm', packageId);
            await (0, promises_2.rm)(packagePath, { recursive: true, force: true });
            return true;
        }
        catch (error) {
            console.error('Error deleting SCORM package:', error);
            return false;
        }
    }
};
exports.ScormService = ScormService;
exports.ScormService = ScormService = __decorate([
    (0, common_1.Injectable)()
], ScormService);
const promises_2 = require("fs/promises");
//# sourceMappingURL=scorm.service.js.map