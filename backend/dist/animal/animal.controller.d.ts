import { AnimalService } from './animal.service';
import { CrearAnimalDto } from './dto/create-animal.dto';
import { ActualizarAnimalDto } from './dto/update-corral.dto';
export declare class AnimalController {
    private readonly animalService;
    constructor(animalService: AnimalService);
    agregarAnimal(corralId: number, crearAnimalDto: CrearAnimalDto): Promise<import("./entities/animal.entity").Animal>;
    obtenerTodosLosAnimales(): Promise<import("./entities/animal.entity").Animal[]>;
    obtenerAnimal(id: number): Promise<import("./entities/animal.entity").Animal>;
    actualizarAnimal(id: number, actualizarAnimalDto: ActualizarAnimalDto): Promise<import("./entities/animal.entity").Animal>;
    eliminarAnimal(id: number): Promise<import("./entities/animal.entity").Animal>;
    actualizarCompatibilidad(animalId: number, compatibilidadDto: {
        noCompatibles: number[];
    }): Promise<import("./entities/animal.entity").Animal>;
}
