import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu:any[]=[
              {
                titulo:'Formatos',
                icono:'material-icons',
                imagen:'assignment',
                submenu:[
                  { titulo:'Registro problemas',url:'Registro_Problemas'},
                  { titulo:'Consulta Formulario Problemas',url:'problemas_consultar'},
              ]
            }
        ];
  constructor() { }
}
