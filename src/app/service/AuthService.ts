import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginResponse: any;

  constructor() { }

  setLoginResponse(response: any) {
    this.loginResponse = response;
  }

  getLoginResponse(): any {
    return this.loginResponse;
  }
}
