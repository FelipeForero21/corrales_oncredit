import { Animal } from 'src/animal/entities/animal.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Corral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ type: 'int', nullable: false })
  capacidad: number; 

  @OneToMany(() => Animal, (animal) => animal.corral)
  animales: Animal[];
}
