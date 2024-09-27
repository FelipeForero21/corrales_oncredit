import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorralService } from './corral.service';
import { CorralController } from './corral.controller';
import { Corral } from './entities/corral.entity';
import { Animal } from 'src/animal/entities/animal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Corral, Animal])],
  providers: [CorralService],
  controllers: [CorralController],
})
export class CorralModule {}
