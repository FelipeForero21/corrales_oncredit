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
exports.AnimalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const corral_entity_1 = require("../corral/entities/corral.entity");
const typeorm_2 = require("typeorm");
const animal_entity_1 = require("./entities/animal.entity");
let AnimalService = class AnimalService {
    constructor(animalRepository, corralRepository) {
        this.animalRepository = animalRepository;
        this.corralRepository = corralRepository;
    }
    async agregarAnimal(corralId, crearAnimalDto) {
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
        const animal = new animal_entity_1.Animal();
        animal.nombre = crearAnimalDto.nombre;
        animal.edad = crearAnimalDto.edad;
        animal.corral = corral;
        if (crearAnimalDto.noCompatibles) {
            await this.verificarCompatibilidad(animal, corral.animales, crearAnimalDto.noCompatibles);
        }
        return this.animalRepository.save(animal);
    }
    async verificarCompatibilidad(animal, animalesDelCorral, noCompatibles) {
        console.log('Verificando compatibilidad para el animal:', animal);
        console.log('Animales del corral:', animalesDelCorral);
        console.log('No compatibles:', noCompatibles);
        const incompatibles = await this.animalRepository.find({
            where: {
                id: (0, typeorm_2.In)(noCompatibles),
            },
        });
        console.log('Animales incompatibles:', incompatibles);
        for (const existente of animalesDelCorral) {
            if (incompatibles.some(incompatible => incompatible.id === existente.id)) {
                throw new common_1.BadRequestException(`El animal ${animal.nombre} no puede convivir con el animal ${existente.nombre}.`);
            }
        }
    }
    async obtenerTodosLosAnimales() {
        return this.animalRepository.find({ relations: ['corral'] });
    }
    async obtenerAnimalPorId(id) {
        const animal = await this.animalRepository.findOne({ where: { id }, relations: ['corral'] });
        if (!animal) {
            throw new common_1.BadRequestException('Animal no encontrado');
        }
        return animal;
    }
    async actualizarAnimal(id, actualizarAnimalDto) {
        const animal = await this.animalRepository.findOne({ where: { id } });
        if (!animal) {
            throw new common_1.BadRequestException('Animal no encontrado');
        }
        const { nombre, edad, corralId } = actualizarAnimalDto;
        if (nombre)
            animal.nombre = nombre;
        if (edad)
            animal.edad = edad;
        if (corralId) {
            const corral = await this.corralRepository.findOne({ where: { id: corralId } });
            if (!corral) {
                throw new common_1.BadRequestException('Corral no encontrado');
            }
            animal.corral = corral;
        }
        return this.animalRepository.save(animal);
    }
    async eliminarAnimal(id) {
        const animal = await this.animalRepository.findOne({ where: { id } });
        if (!animal) {
            throw new common_1.BadRequestException('Animal no encontrado');
        }
        return this.animalRepository.remove(animal);
    }
    async actualizarCompatibilidad(animalId, noCompatibles) {
        const animal = await this.animalRepository.findOne({
            where: { id: animalId },
            relations: ['noCompatibles'],
        });
        if (!animal) {
            throw new common_1.BadRequestException('El animal no existe.');
        }
        const incompatibles = await this.animalRepository.findByIds(noCompatibles);
        animal.noCompatibles = incompatibles;
        return this.animalRepository.save(animal);
    }
};
exports.AnimalService = AnimalService;
exports.AnimalService = AnimalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(animal_entity_1.Animal)),
    __param(1, (0, typeorm_1.InjectRepository)(corral_entity_1.Corral)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AnimalService);
//# sourceMappingURL=animal.service.js.map