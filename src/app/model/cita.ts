import { Paciente } from './paciente';
import { Nutricionista } from './nutricionista';
export class Cita {
id: number;
fechaini: Date;
fechafin: Date;
paciente:Paciente;
nutricionista:Nutricionista=new Nutricionista();
}
