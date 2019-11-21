import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { PlatoPredeterminado } from '../model/plato-predeterminado';
import { Observable } from 'rxjs';
//import swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlatopredeterminadoService {
  private urlEndPoint = 'http://localhost:8080/platopredeterminado/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  private agregarAuthorizationHeader() {
    const token = this.authService.getTokenn();
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
  }
  getPlatosNutricionista(id: number): Observable<PlatoPredeterminado[]> {
    return this.http
      .get(this.urlEndPoint + id + '/', {headers: this.agregarAuthorizationHeader()})
      .pipe(map(response => response as PlatoPredeterminado[]));
    //  return  this.http.get<Cliente[]>(this.urlEndPoint);
  }


  getPlatoByid(id: number): Observable<PlatoPredeterminado> {
    return this.http
      .get(this.urlEndPoint + 'detalle/' + id + '/', {headers: this.agregarAuthorizationHeader()})
      .pipe(map(response => response as PlatoPredeterminado));
    //  return  this.http.get<Cliente[]>(this.urlEndPoint);
  }
  borrarCita(id: number): Observable<any> {
    return this.http.delete(this.urlEndPoint + 'delete/' + id , {headers: this.agregarAuthorizationHeader()});

  }
guardarPlato(plato: PlatoPredeterminado): Observable<PlatoPredeterminado>{
  console.log(JSON.stringify(plato)+'plato a guardar ');
  return this.http.post<PlatoPredeterminado>(this.urlEndPoint + 'save/' + this.authService.getusuario().id, 
  plato , {headers: this.agregarAuthorizationHeader()});
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
