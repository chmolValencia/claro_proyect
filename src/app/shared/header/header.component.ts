import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/AuthService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loginResponse: any;
  nombre:any;
  usuario:any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Recuperar la respuesta almacenada desde localStorage
    const storedResponse = localStorage.getItem('loginResponse');
    if (storedResponse) {
      this.loginResponse = JSON.parse(storedResponse);
    }
    this.nombre=this.loginResponse.usuario.nombre;
    this.usuario=this.loginResponse.usuario.usuario;
  }
}
