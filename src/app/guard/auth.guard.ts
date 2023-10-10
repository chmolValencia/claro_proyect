import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/AuthService';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  loginResponse: any;
  valor: any;
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      const storedResponse = localStorage.getItem('loginResponse');
      if (storedResponse) {
        this.loginResponse = JSON.parse(storedResponse);
        this.valor = this.loginResponse.token_session;
      } else {
      }
      const token = this.loginResponse.token_session;
      if (token) {
        return true;
      } else {
        return this.router.createUrlTree(['/login']); // Cambia '/login' por la ruta de tu página de inicio de sesión
      }
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
