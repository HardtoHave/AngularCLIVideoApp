import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor() {}

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'password') {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }
  logout() {
    this.isLoggedIn = false;
  }
}
