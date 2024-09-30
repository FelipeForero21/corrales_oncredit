import { Repository } from 'typeorm';
import { Corral } from './entities/corral.entity';
import { Animal } from 'src/animal/entities/animal.entity';
import { CrearCorralDto } from './dto/create-corral.dto';
import { CrearAnimalDto } from 'src/animal/dto/create-animal.dto';
export declare class CorralService {
    private corralRepository;
    private animalRepository;
    constructor(corralRepository: Repository<Corral>, animalRepository: Repository<Animal>);
    agregarCorral(crearCorralDto: CrearCorralDto): Promise<Corral>;
    agregarAnimal(corralId: number, crearAnimalDto: CrearAnimalDto): Promise<{
        id: number;
        nombre: string;
        edad: number;
        corralId: number;
    }>;
    obtenerEstadisticasCorral(corralId: number): Promise<{
        cantidadAnimales: number;
        promedioEdad: number;
    }>;
    listarCorrales(): Promise<any[]>;
    obtenerAnimalesPorCorral(corralId: number): Promise<Animal[]>;
    eliminarCorral(corralId: number): Promise<{
        message: string;
    }>;
}
