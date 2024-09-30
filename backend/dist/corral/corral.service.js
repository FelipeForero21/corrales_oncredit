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
exports.CorralService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const corral_entity_1 = require("./entities/corral.entity");
const animal_entity_1 = require("../animal/entities/animal.entity");
let CorralService = class CorralService {
    constructor(corralRepository, animalRepository) {
        this.corralRepository = corralRepository;
        this.animalRepository = animalRepository;
    }
    async agregarCorral(crearCorralDto) {
        const { nombre, capacidad } = crearCorralDto;
        const corral = this.corralRepository.create({ nombre, capacidad });
        return this.corralRepository.save(corral);
    }
    async agregarAnimal(corralId, crearAnimalDto) {
        const { nombre, edad } = crearAnimalDto;
        const animal = this.animalRepository.create({ nombre, edad });
        const corral = await this.corralRepository.findOne({
            where: { id: corralId },
            relations: ['animales'],
        });
        if (!corral) {
            throw new common_1.BadRequestException('El corral no existe.');
        }
        if (corral.animales.length >= corral.capacidad) {
            throw new common_1.BadRequestException(`El corral ${corral.nombre} ha alcanzado su capacidad máxima de ${corral.capacidad} animales.`);
        }
        animal.corral = corral;
        await this.animalRepository.save(animal);
        corral.animales.push(animal);
        await this.corralRepository.save(corral);
        return {
            id: animal.id,
            nombre: animal.nombre,
            edad: animal.edad,
            corralId: corral.id,
        };
    }
    async obtenerEstadisticasCorral(corralId) {
        const corral = await this.corralRepository.findOne({
            where: { id: corralId },
            relations: ['animales'],
        });
        const cantidadAnimales = corral.animales.length;
        const promedioEdad = corral.animales.reduce((sum, animal) => sum + animal.edad, 0) /
            cantidadAnimales;
        return { cantidadAnimales, promedioEdad };
    }
    async listarCorrales() {
        const corrales = await this.corralRepository.find();
        const estadisticasPromises = corrales.map(async (corral) => {
            const estadisticas = await this.obtenerEstadisticasCorral(corral.id);
            return {
                ...corral,
                cantidadAnimales: estadisticas.cantidadAnimales,
                promedioEdad: estadisticas.promedioEdad,
            };
        });
        return Promise.all(estadisticasPromises);
    }
    async obtenerAnimalesPorCorral(corralId) {
        const corral = await this.corralRepository.findOne({
            where: { id: corralId },
            relations: ['animales'],
        });
        if (!corral) {
            throw new common_1.BadRequestException('El corral no fue encontrado.');
        }
        return corral.animales;
    }
    async eliminarCorral(corralId) {
        const corral = await this.corralRepository.findOne({
            where: { id: corralId },
            relations: ['animales'],
        });
        if (!corral) {
            throw new common_1.BadRequestException('El corral no existe.');
        }
        await this.animalRepository.delete({ corral: { id: corralId } });
        await this.corralRepository.delete(corralId);
        return { message: 'Corral y animales asociados eliminados con éxito.' };
    }
};
exports.CorralService = CorralService;
exports.CorralService = CorralService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(corral_entity_1.Corral)),
    __param(1, (0, typeorm_1.InjectRepository)(animal_entity_1.Animal)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CorralService);
//# sourceMappingURL=corral.service.js.map