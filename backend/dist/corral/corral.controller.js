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
exports.CorralController = void 0;
const common_1 = require("@nestjs/common");
const corral_service_1 = require("./corral.service");
const create_corral_dto_1 = require("./dto/create-corral.dto");
const create_animal_dto_1 = require("../animal/dto/create-animal.dto");
let CorralController = class CorralController {
    constructor(corralService) {
        this.corralService = corralService;
    }
    async agregarCorral(crearCorralDto) {
        return this.corralService.agregarCorral(crearCorralDto);
    }
    async agregarAnimal(corralId, agregarAnimalDto) {
        return this.corralService.agregarAnimal(corralId, agregarAnimalDto);
    }
    async listarCorrales() {
        return this.corralService.listarCorrales();
    }
    async obtenerEstadisticas(corralId) {
        return this.corralService.obtenerEstadisticasCorral(corralId);
    }
    async obtenerAnimalesPorCorral(corralId) {
        return this.corralService.obtenerAnimalesPorCorral(corralId);
    }
    async eliminarCorral(id) {
        return this.corralService.eliminarCorral(id);
    }
};
exports.CorralController = CorralController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_corral_dto_1.CrearCorralDto]),
    __metadata("design:returntype", Promise)
], CorralController.prototype, "agregarCorral", null);
__decorate([
    (0, common_1.Post)(':id/animales'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_animal_dto_1.CrearAnimalDto]),
    __metadata("design:returntype", Promise)
], CorralController.prototype, "agregarAnimal", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CorralController.prototype, "listarCorrales", null);
__decorate([
    (0, common_1.Get)(':id/estadisticas'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CorralController.prototype, "obtenerEstadisticas", null);
__decorate([
    (0, common_1.Get)(':id/animales'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CorralController.prototype, "obtenerAnimalesPorCorral", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CorralController.prototype, "eliminarCorral", null);
exports.CorralController = CorralController = __decorate([
    (0, common_1.Controller)('corrales'),
    __metadata("design:paramtypes", [corral_service_1.CorralService])
], CorralController);
//# sourceMappingURL=corral.controller.js.map