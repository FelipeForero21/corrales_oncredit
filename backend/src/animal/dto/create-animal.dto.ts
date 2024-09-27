import { IsString, IsInt, IsOptional, IsArray } from 'class-validator';

export class CrearAnimalDto {
  @IsString()
  nombre: string;

  @IsInt()
  edad: number;

  @IsOptional()
  @IsInt()
  corralId?: number;

  @IsOptional()
  @IsArray()
  noCompatibles?: number[];
}
