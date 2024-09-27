import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { Corral } from 'src/corral/entities/corral.entity';
import { Animal } from './entities/animal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Corral])],
  providers: [AnimalService],
  controllers: [AnimalController],
})
export class AnimalModule {}
