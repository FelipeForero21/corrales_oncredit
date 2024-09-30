import { Corral } from '../../corral/entities/corral.entity';
export declare class Animal {
    id: number;
    nombre: string;
    edad: number;
    corral: Corral;
    compatibles: Animal[];
    noCompatibles: Animal[];
}
