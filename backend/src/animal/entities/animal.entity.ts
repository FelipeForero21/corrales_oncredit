import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Corral } from '../../corral/entities/corral.entity';

@Entity()
export class Animal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    edad: number;

    @ManyToOne(() => Corral, (corral) => corral.animales, { nullable: true })
    corral: Corral;

    @ManyToMany(() => Animal, (animal) => animal.noCompatibles)
    @JoinTable()
    compatibles: Animal[];

    @ManyToMany(() => Animal, (animal) => animal.compatibles, { cascade: true })
    noCompatibles: Animal[];
}
