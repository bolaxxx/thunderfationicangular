import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Cita } from '../model/cita';
import { map } from 'rxjs/operators';
//import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private urlEndPoint = 'http://localhost:8080/cita/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  private agregarAuthorizationHeader() {
    const token = this.authService.getTokenn();
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
  }
  getCitasNutricionista(id: number): Observable<Cita[]> {
    return this.http
      .get(this.urlEndPoint + 'nutricionista/' + id, {headers: this.agregarAuthorizationHeader()})
      .pipe(map(response => response as Cita[]));
    //  return  this.http.get<Cliente[]>(this.urlEndPoint);
  }


  getPacienteByid(id: number): Observable<Cita> {
    return this.http
      .get(this.urlEndPoint + 'detalle/' + id, {headers: this.agregarAuthorizationHeader()})
      .pipe(map(response => response as Cita));
    //  return  this.http.get<Cliente[]>(this.urlEndPoint);
  }
  borrarCita(id: number): Observable<any> {
    return this.http.delete(this.urlEndPoint + 'delete/' + id , {headers: this.agregarAuthorizationHeader()});

  }
guardarCita(cita: Cita): Observable<Cita>{
  return this.http.post<Cita>(this.urlEndPoint + 'save/' + this.authService.getusuario().id, 
  cita , {headers: this.agregarAuthorizationHeader()});
}
buscarProximaCita(): Observable<Cita>{

  return this.http.get(this.urlEndPoint +  'nextcita/' + this.authService.getusuario().id + '/' +
  new Date().toISOString(), {headers: this.agregarAuthorizationHeader()})
  .pipe(map(response => response as Cita));
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
       //  `Hola ${this.authService.getusuario().username} no tienes autorizacion para acceder al recurso ` , 'warning');
        this.router.navigate(['/']);
        return true;
      }
    return false;
     }
}
