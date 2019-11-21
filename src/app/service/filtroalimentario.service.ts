import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { FiltroAlimentario } from '../model/filtro-alimentario';
import { map } from 'rxjs/operators';
//import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FiltroalimentarioService {
  private urlEndPoint = 'http://localhost:8080/filtroAlimentario/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  private agregarAuthorizationHeader() {
    const token = this.authService.getTokenn();
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
  }
  getFiltrosNutricionista(id: number): Observable<FiltroAlimentario[]> {
    return this.http
      .get(this.urlEndPoint  + id + '/', {headers: this.agregarAuthorizationHeader()})
      .pipe(map(response => response as FiltroAlimentario[]));
    //  return  this.http.get<Cliente[]>(this.urlEndPoint);
  }


  getPacienteByid(id: number): Observable<FiltroAlimentario> {
    return this.http
      .get(this.urlEndPoint + 'detalle/' + id + '/', {headers: this.agregarAuthorizationHeader()})
      .pipe(map(response => response as FiltroAlimentario));
    //  return  this.http.get<Cliente[]>(this.urlEndPoint);
  }
  borrarCita(id: number): Observable<any> {
    return this.http.delete(this.urlEndPoint + 'delete/' + id , {headers: this.agregarAuthorizationHeader()});

  }
guardarFiltro(filtro: FiltroAlimentario): Observable<FiltroAlimentario>{
  return this.http.post<FiltroAlimentario>(this.urlEndPoint + 'save/' + this.authService.getusuario().id,
  filtro , {headers: this.agregarAuthorizationHeader()});
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
}
