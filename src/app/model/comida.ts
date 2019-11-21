import { PlatoPlanDieta } from './plato-plan-dieta';
export class Comida {
id: number;
hora: Date;
valoracion: number;
platos: PlatoPlanDieta[] = [];
}
