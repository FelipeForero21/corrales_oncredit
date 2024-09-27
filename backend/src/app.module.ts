import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorralModule } from './corral/corral.module';
import { AnimalModule } from './animal/animal.module';
import { ConfigModule } from '@nestjs/config';
import { Corral } from './corral/entities/corral.entity';
import { Animal } from './animal/entities/animal.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Corral, Animal],
      synchronize: true, 
      ssl: {
        rejectUnauthorized: false, 
      },
    }),
    CorralModule,
    AnimalModule,
  ],
})
export class AppModule {}
