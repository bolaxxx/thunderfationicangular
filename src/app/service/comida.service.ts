import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Comida } from '../model/comida';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PlatoPredeterminado } from '../model/plato-predeterminado';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {
  private urlEndPoint = 'http://localhost:8080/comida/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  private agregarAuthorizationHeader() {
    const token = this.authService.getTokenn();
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
  }
  getCitasNutricionista(id: number): Observable<any[]> {
    return this.http
      .get(this.urlEndPoint + 'nutricionista/' + id, {headers: this.agregarAuthorizationHeader()})
      .pipe(map(response => response as any[]));
    //  return  this.http.get<Cliente[]>(this.urlEndPoint);
  }


  getComidaByid(id: number): Observable<Comida> {
    return this.http
      .get(this.urlEndPoint + 'detalle/' + id, {headers: this.agregarAuthorizationHeader()})
      .pipe(map(response => response as Comida));
    //  return  this.http.get<Cliente[]>(this.urlEndPoint);
  }
  getPosiblesCambios(id_plato:number): Observable<PlatoPredeterminado[]>{
    return this.http
    .get(this.urlEndPoint + 'cambios/' + id_plato + '/' + this.authService.getusuario().id, {headers: this.agregarAuthorizationHeader()})
    .pipe(map(response => response as PlatoPredeterminado[]));
  }
}
