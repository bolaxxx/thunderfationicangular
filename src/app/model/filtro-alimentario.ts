import { Alimento } from './alimento';
export class FiltroAlimentario {
    id: number;
    nombre: string;
    descripcion: string;
    alimentos: Alimento[] = [];
}
