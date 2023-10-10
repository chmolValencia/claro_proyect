import { Component } from '@angular/core';
import { ControllerService } from '../../../app/service/controller';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/AuthService';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  iApp:string='CLAROPROYECTO';
  userData: any;
  remember:boolean = false;
  alertMessage: string = ''; // Propiedad para el mensaje de alerta

  constructor(
    private router:Router,
    private controllerService: ControllerService,
    private authService: AuthService)
    {}



  login() {

    this.controllerService.postLogin(this.username, this.password, this.iApp).subscribe(
      (response) => {

        this.userData = response;
        console.log(this.userData);
        if (this.userData.estado === "OK_SESSION") {
          this.router.navigateByUrl('/');
        //  this.authService.setLoginResponse(this.userData);
          localStorage.setItem('loginResponse', JSON.stringify(response));
          const token = localStorage.getItem('token' || '');

        } else {
          this.alertMessage = 'No se pudo iniciar sesión ' + this.userData.estado;
          }
      },
      (error) => {
        this.alertMessage = 'No se pudo iniciar sesión problemas en el servicio';
      }
    );
  }


}
