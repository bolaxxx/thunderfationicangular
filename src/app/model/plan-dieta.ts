import { Comida } from './comida';
import { FiltroAlimentario } from './filtro-alimentario';
import { DiaDieta } from './diadieta';
export class PlanDieta {
id: number;
fechaini: Date;
fechafin: Date;
calrangomin: number;
calrangomax: number;
ingestacaldiaria: number;
repartoglucidodiario: number;
repartolipidodiario: number;
repartoprotidodiario: number	;
comidasdiarias: number;
dias: DiaDieta[] = [];
filtrosaplicados: FiltroAlimentario;
}
