import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Corral } from './entities/corral.entity';
import { Animal } from 'src/animal/entities/animal.entity';
import { CrearCorralDto } from './dto/create-corral.dto';
import { CrearAnimalDto } from 'src/animal/dto/create-animal.dto';

@Injectable()
export class CorralService {
  constructor(
    @InjectRepository(Corral)
    private corralRepository: Repository<Corral>,

    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  async agregarCorral(crearCorralDto: CrearCorralDto) {
    const { nombre, capacidad } = crearCorralDto;
    const corral = this.corralRepository.create({ nombre, capacidad });
    return this.corralRepository.save(corral);
  }

  async agregarAnimal(corralId: number, crearAnimalDto: CrearAnimalDto) {
    const { nombre, edad } = crearAnimalDto;
    const animal = this.animalRepository.create({ nombre, edad });

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

  async obtenerEstadisticasCorral(corralId: number) {
    const corral = await this.corralRepository.findOne({
      where: { id: corralId },
      relations: ['animales'],
    });
    const cantidadAnimales = corral.animales.length;
    const promedioEdad =
      corral.animales.reduce((sum, animal) => sum + animal.edad, 0) /
      cantidadAnimales;

    return { cantidadAnimales, promedioEdad };
  }

  async listarCorrales(): Promise<any[]> {
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
  async obtenerAnimalesPorCorral(corralId: number): Promise<Animal[]> {
    const corral = await this.corralRepository.findOne({
      where: { id: corralId },
      relations: ['animales'],
    });

    if (!corral) {
      throw new BadRequestException('El corral no fue encontrado.');
    }

    return corral.animales;
  }

  async eliminarCorral(corralId: number) {
    const corral = await this.corralRepository.findOne({
      where: { id: corralId },
      relations: ['animales'],
    });

    if (!corral) {
      throw new BadRequestException('El corral no existe.');
    }

    await this.animalRepository.delete({ corral: { id: corralId } });

    await this.corralRepository.delete(corralId);

    return { message: 'Corral y animales asociados eliminados con éxito.' };
  }
}
