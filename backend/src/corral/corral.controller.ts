import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { CorralService } from './corral.service';
import { CrearCorralDto } from './dto/create-corral.dto';
import { CrearAnimalDto } from 'src/animal/dto/create-animal.dto';

@Controller('corrales')
export class CorralController {
  constructor(private readonly corralService: CorralService) {}

  @Post()
  async agregarCorral(@Body() crearCorralDto: CrearCorralDto) {
    return this.corralService.agregarCorral(crearCorralDto);
  }

  @Post(':id/animales')
  async agregarAnimal(
      @Param('id') corralId: number,
      @Body() agregarAnimalDto: CrearAnimalDto,
  ) {
      return this.corralService.agregarAnimal(corralId, agregarAnimalDto);
  }

  @Get()
  async listarCorrales() {
    return this.corralService.listarCorrales(); 
  }
  

  @Get(':id/estadisticas')
  async obtenerEstadisticas(@Param('id') corralId: number) {
    return this.corralService.obtenerEstadisticasCorral(corralId);
  }

  @Get(':id/animales')
  async obtenerAnimalesPorCorral(@Param('id') corralId: number) {
    return this.corralService.obtenerAnimalesPorCorral(corralId);
  }


  @Delete(':id')
  async eliminarCorral(@Param('id') id: number) {
    return this.corralService.eliminarCorral(id);
  }
}
