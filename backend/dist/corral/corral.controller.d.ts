import { CorralService } from './corral.service';
import { CrearCorralDto } from './dto/create-corral.dto';
import { CrearAnimalDto } from 'src/animal/dto/create-animal.dto';
export declare class CorralController {
    private readonly corralService;
    constructor(corralService: CorralService);
    agregarCorral(crearCorralDto: CrearCorralDto): Promise<import("./entities/corral.entity").Corral>;
    agregarAnimal(corralId: number, agregarAnimalDto: CrearAnimalDto): Promise<{
        id: number;
        nombre: string;
        edad: number;
        corralId: number;
    }>;
    listarCorrales(): Promise<any[]>;
    obtenerEstadisticas(corralId: number): Promise<{
        cantidadAnimales: number;
        promedioEdad: number;
    }>;
    obtenerAnimalesPorCorral(corralId: number): Promise<import("../animal/entities/animal.entity").Animal[]>;
    eliminarCorral(id: number): Promise<{
        message: string;
    }>;
}
