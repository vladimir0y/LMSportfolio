"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScormController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const scorm_service_1 = require("./scorm.service");
const promises_1 = require("fs/promises");
const adm_zip_1 = require("adm-zip");
const fast_xml_parser_1 = require("fast-xml-parser");
let ScormController = class ScormController {
    constructor(scormService) {
        this.scormService = scormService;
    }
    async uploadScorm(file) {
        var _a, _b, _c, _d;
        if (!file) {
            throw new common_1.BadRequestException('No file uploaded');
        }
        try {
            const zip = new adm_zip_1.default(file.path);
            const zipEntries = zip.getEntries();
            const manifestEntry = zipEntries.find(entry => entry.entryName === 'imsmanifest.xml');
            if (!manifestEntry) {
                throw new common_1.BadRequestException('No imsmanifest.xml found in ZIP');
            }
            const manifestContent = manifestEntry.getData().toString('utf8');
            const parser = new fast_xml_parser_1.XMLParser({ ignoreAttributes: false });
            const manifest = parser.parse(manifestContent);
            let launchFile = 'index.html';
            try {
                const organizations = (_b = (_a = manifest.manifest) === null || _a === void 0 ? void 0 : _a.organizations) === null || _b === void 0 ? void 0 : _b.organization;
                if (organizations) {
                    const org = Array.isArray(organizations) ? organizations[0] : organizations;
                    const items = org.item;
                    if (items) {
                        const firstItem = Array.isArray(items) ? items[0] : items;
                        const resourceId = firstItem['@_identifierref'];
                        const resources = (_d = (_c = manifest.manifest) === null || _c === void 0 ? void 0 : _c.resources) === null || _d === void 0 ? void 0 : _d.resource;
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
            }
            catch (error) {
                console.warn('Could not parse launch file from manifest, using default');
            }
            const packageName = file.originalname.replace('.zip', '');
            const packageDir = (0, path_1.join)(process.cwd(), 'uploads', 'scorm', packageName);
            await (0, promises_1.mkdir)(packageDir, { recursive: true });
            zip.extractAllTo(packageDir, true);
            const metadata = {
                originalName: file.originalname,
                uploadedAt: new Date().toISOString(),
                launch: launchFile,
                manifest: manifest
            };
            await (0, promises_1.writeFile)((0, path_1.join)(packageDir, '.openlms.json'), JSON.stringify(metadata, null, 2));
            return {
                success: true,
                packageName,
                launchUrl: `/public/scorm/${packageName}/${launchFile}`,
                message: 'SCORM package uploaded and extracted successfully'
            };
        }
        catch (error) {
            console.error('Error processing SCORM package:', error);
            throw new common_1.BadRequestException('Failed to process SCORM package: ' + error.message);
        }
    }
    async listPackages() {
        return this.scormService.listPackages();
    }
    async deletePackage(id) {
        const success = await this.scormService.deletePackage(id);
        return { success };
    }
    async launchScorm(zip) {
        return { launchUrl: `/public/scorm/${zip}/index.html` };
    }
};
exports.ScormController = ScormController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/temp',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix + (0, path_1.extname)(file.originalname));
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype === 'application/zip' || file.originalname.endsWith('.zip')) {
                cb(null, true);
            }
            else {
                cb(new common_1.BadRequestException('Only ZIP files are allowed'), false);
            }
        },
        limits: {
            fileSize: 100 * 1024 * 1024,
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScormController.prototype, "uploadScorm", null);
__decorate([
    (0, common_1.Get)('packages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScormController.prototype, "listPackages", null);
__decorate([
    (0, common_1.Delete)('packages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScormController.prototype, "deletePackage", null);
__decorate([
    (0, common_1.Get)('launch/:zip'),
    __param(0, (0, common_1.Param)('zip')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScormController.prototype, "launchScorm", null);
exports.ScormController = ScormController = __decorate([
    (0, common_1.Controller)('api/scorm'),
    __metadata("design:paramtypes", [scorm_service_1.ScormService])
], ScormController);
//# sourceMappingURL=scorm.controller.js.map