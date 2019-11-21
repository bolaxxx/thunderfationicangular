import { Paciente } from './paciente';
import { Cita } from './cita';
import { PlanDieta } from './plan-dieta';
import { FiltroAlimentario } from './filtro-alimentario';
import { PlatoPredeterminado } from './plato-predeterminado';
import { Usuario } from './usuario';
export class Nutricionista extends Usuario {
 nombre: string;
 apellidos: string;
 telefono: string;
 localidad: string;
 provincia: string;
 dni: string;
 direccion: string;
 pacientes: Paciente [] = [];
 citas: Cita [] = [];
 planesdietas: PlanDieta [] = [];
 filtros: FiltroAlimentario[] = [];
 platos: PlatoPredeterminado[] = [];
}
