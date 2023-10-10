import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrlZuul } from '../../app/url-utils';
import { catchError } from 'rxjs/operators';
import { Observable, throwError, } from 'rxjs';
import { RegistroProblemasComponent } from '../pages/registro-problemas/registro-problemas.component';
import { RegistroFhu } from '../pages/entity/RegistroFhu';


@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  [x: string]: any;
  enviarDatosAlBackend(formData: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {  }

  public postLogin(usuario: string, password: string, idApp: string) {
    const baseUrl = ApiUrlZuul('login');
    const url = baseUrl;
    const body = { usuario, password, idApp };
    const headers = new HttpHeaders({'Content-Type': 'application/json','Accept': 'application/json'});
    return this.http.post(url, body, { headers, withCredentials: true }).pipe(catchError((error: any) => {console.error('Error en la solicitud:', error);
      return throwError(error);
      })
    );
  }

  public RegistroProblemasComponent(formData: any): Observable<any> {
    const baseUrl = ApiUrlZuul("insertar_problemas");
    const urlRegistro = baseUrl;
    const headers = new HttpHeaders({'Content-Type': 'application/json','Accept': 'application/json'});
    return this.http.post(urlRegistro, formData, { headers, withCredentials: true }).pipe(
      catchError((error: any) => {console.error('Error en la solicitud:', error);
      return throwError(error);
      })
    );
  }


  public editarFormularioHU(datos: any): Observable<any> {
console.log("variable datos",datos);
    const baseUrl = ApiUrlZuul("editar_registro");
    const urlRegistro = baseUrl;
    const headers = new HttpHeaders({'Content-Type': 'application/json','Accept': 'application/json'});
    return this.http.put(urlRegistro, datos, { headers, withCredentials: true }).pipe(
      catchError((error: any) => {console.error('Error en la solicitud:', error);
      return throwError(error);
      })
    );
  }

    public consultarPorCodigo() {
      console.log("dentro aservicio de get");
      const baseUrl = ApiUrlZuul("obtener_registros");
      const urlRegistro = baseUrl;
      const headers = new HttpHeaders({'Accept': 'application/json'});
      return this.http.get<RegistroFhu[]>(baseUrl, { headers, withCredentials: true }).pipe(
        catchError((error: any) => {
          console.error('Error en la solicitud:', error);
          return throwError(error);
        })
      );
    }


}

