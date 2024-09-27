import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Corral } from 'src/corral/entities/corral.entity';
import { In, Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CrearAnimalDto } from './dto/create-animal.dto';
import { ActualizarAnimalDto } from './dto/update-corral.dto';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,

    @InjectRepository(Corral)
    private corralRepository: Repository<Corral>,
  ) {}

  async agregarAnimal(corralId: number, crearAnimalDto: CrearAnimalDto) {
    const corral = await this.corralRepository.findOne({
        where: { id: corralId },
        relations: ['animales'],
    });

    if (!corral) {
        throw new BadRequestException('El corral no existe.');
    }

    if (corral.animales.length >= corral.capacidad) {
        throw new BadRequestException(
            `El corral ${corral.nombre} ha alcanzado su capacidad máxima de ${corral.capacidad} animales.`,
        );
    }

    const animal = new Animal();
    animal.nombre = crearAnimalDto.nombre;
    animal.edad = crearAnimalDto.edad;
    animal.corral = corral;

    if (crearAnimalDto.noCompatibles) {
        await this.verificarCompatibilidad(animal, corral.animales, crearAnimalDto.noCompatibles);
    }

    return this.animalRepository.save(animal);
}

private async verificarCompatibilidad(animal: Animal, animalesDelCorral: Animal[], noCompatibles: number[]) {
  console.log('Verificando compatibilidad para el animal:', animal);
  console.log('Animales del corral:', animalesDelCorral);
  console.log('No compatibles:', noCompatibles);

  const incompatibles = await this.animalRepository.find({
    where: {
      id: In(noCompatibles),
    },
  });

  console.log('Animales incompatibles:', incompatibles);

  for (const existente of animalesDelCorral) {
    if (incompatibles.some(incompatible => incompatible.id === existente.id)) {
      throw new BadRequestException(
        `El animal ${animal.nombre} no puede convivir con el animal ${existente.nombre}.`,
      );
    }
  }
}


  async obtenerTodosLosAnimales(): Promise<Animal[]> {
    return this.animalRepository.find({ relations: ['corral'] });
  }

  async obtenerAnimalPorId(id: number): Promise<Animal> {

    const animal = await this.animalRepository.findOne({ where: { id }, relations: ['corral'] });
    
    if (!animal) {
      throw new BadRequestException('Animal no encontrado');
    }

    return animal;
  }

  async actualizarAnimal(id: number, actualizarAnimalDto: ActualizarAnimalDto) {
    const animal = await this.animalRepository.findOne({ where: { id } });

    if (!animal) {
      throw new BadRequestException('Animal no encontrado');
    }

    const { nombre, edad, corralId } = actualizarAnimalDto; 

    if (nombre) animal.nombre = nombre;
    if (edad) animal.edad = edad;

    if (corralId) {
      const corral = await this.corralRepository.findOne({ where: { id: corralId } });
      if (!corral) {
        throw new BadRequestException('Corral no encontrado');
      }
      animal.corral = corral;
    }

    return this.animalRepository.save(animal);
  }

  async eliminarAnimal(id: number) {
    const animal = await this.animalRepository.findOne({ where: { id } });
    
    if (!animal) {
      throw new BadRequestException('Animal no encontrado');
    }
    
    return this.animalRepository.remove(animal);
  }

  async actualizarCompatibilidad(animalId: number, noCompatibles: number[]) {
    const animal = await this.animalRepository.findOne({
        where: { id: animalId },
        relations: ['noCompatibles'],
    });
    
    if (!animal) {
        throw new BadRequestException('El animal no existe.');
    }
    
    const incompatibles = await this.animalRepository.findByIds(noCompatibles);
    animal.noCompatibles = incompatibles;
    
    return this.animalRepository.save(animal);
}

}
