import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
//import swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlanDieta } from '../model/plan-dieta';
import { Ingrediente } from '../model/ingrediente';

@Injectable({
  providedIn: 'root'
})
export class PlandietaService {
  private urlEndPoint = 'http://localhost:8080/plandieta/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  private agregarAuthorizationHeader() {
    const token = this.authService.getTokenn();
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
  }
  getCitasNutricionista(id: number): Observable<PlanDieta[]> {
    return this.http
      .get(this.urlEndPoint + 'nutricionista/' + id, {headers: this.agregarAuthorizationHeader()})
      .pipe(map(response => response as PlanDieta[]));
    //  return  this.http.get<Cliente[]>(this.urlEndPoint);
  }


  getPacienteByid(id: number): Observable<PlanDieta> {
    return this.http
      .get(this.urlEndPoint + 'detalle/' + id, {headers: this.agregarAuthorizationHeader()})
      .pipe(map(response => response as PlanDieta));
    //  return  this.http.get<Cliente[]>(this.urlEndPoint);
  }
  borrarPLan(id: number): Observable<any> {
    return this.http.delete(this.urlEndPoint + 'delete/' + id , {headers: this.agregarAuthorizationHeader()});

  }
guardarCita(plandieta: PlanDieta, paciente: number): Observable<PlanDieta> {
  return this.http.post<PlanDieta>(this.urlEndPoint + 'save/' + this.authService.getusuario().id + '/' + paciente,
  plandieta , {headers: this.agregarAuthorizationHeader()});
}

getCurrentPlanByPaciente(id: number): Observable<PlanDieta> {
  const fecha= new  Date().toISOString() ;
  return this.http
    .get(this.urlEndPoint + 'paciente/' + id + '/' + fecha, {headers: this.agregarAuthorizationHeader()})
    .pipe(map(response => response as PlanDieta));
  //  return  this.http.get<Cliente[]>(this.urlEndPoint);
}
getlistaCompra(id: number): Observable<Ingrediente[]> {
  const fecha= new  Date().toISOString() ;
  return this.http
    .get(this.urlEndPoint + 'listacompra/' + id + '/'+ fecha , {headers: this.agregarAuthorizationHeader()})
    .pipe(map(response => response as Ingrediente[]));
  //  return  this.http.get<Cliente[]>(this.urlEndPoint);
}
  private isNotAuthorizado(e): boolean {
    if (e.status === 401 ) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
      }
    if (e.status === 403) {
       /// swal.fire('Acceso Denegado',
      ///   `Hola ${this.authService.getusuario().username} no tienes autorizacion para acceder al recurso ` , 'warning');
        this.router.navigate(['/']);
        return true;
      }
    return false;
     }
}
