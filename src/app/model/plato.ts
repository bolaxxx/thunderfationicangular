import { Ingrediente } from './ingrediente';
export class Plato {
id: number;
nombre: string;
ingredientes: Ingrediente [] = [];
receta: string;
kcaltotales: number=0;
proteinastotales: number=0;
grasastotales: number=0;
hidratostotales: number=0;
}
