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
exports.AnimalController = void 0;
const common_1 = require("@nestjs/common");
const animal_service_1 = require("./animal.service");
const create_animal_dto_1 = require("./dto/create-animal.dto");
const update_corral_dto_1 = require("./dto/update-corral.dto");
let AnimalController = class AnimalController {
    constructor(animalService) {
        this.animalService = animalService;
    }
    async agregarAnimal(corralId, crearAnimalDto) {
        return this.animalService.agregarAnimal(corralId, crearAnimalDto);
    }
    async obtenerTodosLosAnimales() {
        return this.animalService.obtenerTodosLosAnimales();
    }
    async obtenerAnimal(id) {
        return this.animalService.obtenerAnimalPorId(id);
    }
    async actualizarAnimal(id, actualizarAnimalDto) {
        return this.animalService.actualizarAnimal(id, actualizarAnimalDto);
    }
    async eliminarAnimal(id) {
        return this.animalService.eliminarAnimal(id);
    }
    async actualizarCompatibilidad(animalId, compatibilidadDto) {
        return this.animalService.actualizarCompatibilidad(animalId, compatibilidadDto.noCompatibles);
    }
};
exports.AnimalController = AnimalController;
__decorate([
    (0, common_1.Post)(':corralId'),
    __param(0, (0, common_1.Param)('corralId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_animal_dto_1.CrearAnimalDto]),
    __metadata("design:returntype", Promise)
], AnimalController.prototype, "agregarAnimal", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnimalController.prototype, "obtenerTodosLosAnimales", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnimalController.prototype, "obtenerAnimal", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_corral_dto_1.ActualizarAnimalDto]),
    __metadata("design:returntype", Promise)
], AnimalController.prototype, "actualizarAnimal", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnimalController.prototype, "eliminarAnimal", null);
__decorate([
    (0, common_1.Post)(':id/compatibilidad'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AnimalController.prototype, "actualizarCompatibilidad", null);
exports.AnimalController = AnimalController = __decorate([
    (0, common_1.Controller)('animales'),
    __metadata("design:paramtypes", [animal_service_1.AnimalService])
], AnimalController);
//# sourceMappingURL=animal.controller.js.map