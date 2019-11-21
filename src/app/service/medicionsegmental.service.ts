import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { MedicionGeneral } from '../model/medicion-general';
import { map } from 'rxjs/operators';
import { MedicionSegmental } from '../model/medicion-segmental';
//import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class MedicionsegmentalService {
  private urlEndPoint = 'http://localhost:8080/medicion_segmental/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  private agregarAuthorizationHeader() {
    const token = this.authService.getTokenn();
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
  }
  guardarMedicion(medicion: MedicionSegmental, paciente: number): Observable<MedicionSegmental> {
    return this.http.post<MedicionSegmental>(this.urlEndPoint + 'save/' + paciente, medicion ,
     {headers: this.agregarAuthorizationHeader()} );
  }
  updateMedicicion(medicion: MedicionSegmental): Observable<MedicionSegmental>{
    console.log(JSON.stringify(medicion ) + 'update medicion');
    return this.http.put<MedicionSegmental>(this.urlEndPoint + 'actualizar/' + medicion.id,
     medicion, {headers: this.agregarAuthorizationHeader()});
  }
  eliminarMedicion(id: number): Observable<any> {
    return   this.http.delete(this.urlEndPoint + 'eliminar/' + id, {headers: this.agregarAuthorizationHeader()});
  }
  getMedciones(id: number): Observable<MedicionSegmental[]> {
    console.log('get segmental ');
    return this.http
      .get(this.urlEndPoint + id + '/', {headers: this.agregarAuthorizationHeader()})
      .pipe(map(response => response as MedicionSegmental[]));
    //  return  this.http.get<Cliente[]>(this.urlEndPoint);
  }


  getMedicionByid(id: number): Observable<MedicionSegmental> {
    console.log('id getmedicion' + id);
    return this.http
      .get(this.urlEndPoint + 'detalle/' + id, {headers: this.agregarAuthorizationHeader()})
      .pipe(map(response => response as MedicionSegmental));
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
       // swal.fire('Acceso Denegado',
         //`Hola ${this.authService.getusuario().username} no tienes autorizacion para acceder al recurso ` , 'warning');
        this.router.navigate(['/']);
        return true;
      }
    return false;
     }
}
