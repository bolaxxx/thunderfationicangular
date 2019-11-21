import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Paciente } from '../model/paciente';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private urlEndPoint = 'http://localhost:8080/paciente/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  private agregarAuthorizationHeader() {
    const token = this.authService.getTokenn();
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
  }
  getPacientes(id: number): Observable<Paciente[]> {
    return this.http
      .get(this.urlEndPoint + id + '/', {headers: this.agregarAuthorizationHeader()})
      .pipe(map(response => response as Paciente[]
        ));
    //  return  this.http.get<Cliente[]>(this.urlEndPoint);
  }


  getPacienteByid(id: number): Observable<Paciente> {
    return this.http
      .get(this.urlEndPoint + 'detalle/' + id + '/', {headers: this.agregarAuthorizationHeader()})
      .pipe(map(response => response as Paciente));
    //  return  this.http.get<Cliente[]>(this.urlEndPoint);
  }
     buscarporNombreCompleto(id: number , searchterm: string): Observable<Paciente[]> {
     const param = new HttpParams().set( 'id' , id.toString()).set('searchterm', searchterm);
     return this.http.get(this.urlEndPoint + 'searchFullName/',
     {headers: this.agregarAuthorizationHeader(),  params: param}).pipe(map(response => response as Paciente[]));
    }
    buscarporDni(id: number , searchterm: string): Observable<Paciente[]> {
      const param = new HttpParams().set( 'id' , id.toString()).set('searchterm', searchterm);
      return this.http.get(this.urlEndPoint + 'searchDni/',
      {headers: this.agregarAuthorizationHeader(),  params: param}).pipe(map(response => response as Paciente[]));
     }
     buscarporEmail(id: number , searchterm: string): Observable<Paciente[]> {
      const param = new HttpParams().set( 'id' , id.toString()).set('searchterm', searchterm);
      return this.http.get(this.urlEndPoint + 'searchPhone/',
      {headers: this.agregarAuthorizationHeader(),  params: param}).pipe(map(response => response as Paciente[]));
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
       // swal.fire('Acceso Denegado',
        // `Hola ${this.authService.getusuario().username} no tienes autorizacion para acceder al recurso ` , 'warning');
        this.router.navigate(['/']);
        return true;
      }
    return false;
     }

     public guardarPaciente(paciente: Paciente): any {
       paciente.nutricionista.id = this.authService.getusuario().id;
       paciente.nutricionista.email = this.authService.getusuario().email;
       return this.http.post<Paciente>(this.urlEndPoint + 'save', paciente , {headers: this.agregarAuthorizationHeader()} );
     }
     public eliminarPaciente(id: number): Observable<any> {
       console.log('llego al metodo eliminar');
       return   this.http.delete(this.urlEndPoint + 'eliminar/' + id, {headers: this.agregarAuthorizationHeader()});
     }
     public updatePaciente(paciente: Paciente): Observable<Paciente> {
       console.log(JSON.stringify(paciente ) + 'update paciente');
       return this.http.put<Paciente>(this.urlEndPoint + 'actualizar/' + paciente.id,
        paciente, {headers: this.agregarAuthorizationHeader()});

     }
}
