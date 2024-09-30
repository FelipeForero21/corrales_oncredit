import { Corral } from 'src/corral/entities/corral.entity';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CrearAnimalDto } from './dto/create-animal.dto';
import { ActualizarAnimalDto } from './dto/update-corral.dto';
export declare class AnimalService {
    private animalRepository;
    private corralRepository;
    constructor(animalRepository: Repository<Animal>, corralRepository: Repository<Corral>);
    agregarAnimal(corralId: number, crearAnimalDto: CrearAnimalDto): Promise<Animal>;
    private verificarCompatibilidad;
    obtenerTodosLosAnimales(): Promise<Animal[]>;
    obtenerAnimalPorId(id: number): Promise<Animal>;
    actualizarAnimal(id: number, actualizarAnimalDto: ActualizarAnimalDto): Promise<Animal>;
    eliminarAnimal(id: number): Promise<Animal>;
    actualizarCompatibilidad(animalId: number, noCompatibles: number[]): Promise<Animal>;
}
