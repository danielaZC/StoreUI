import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public authenticated = false;

  constructor(private router: Router) {
  }

  async checkAuthenticated() {
    this.isAuthenticated.next(this.authenticated);
    return this.authenticated;
  }

  async login(username: string, password: string) {
    this.authenticated = true;
    this.isAuthenticated.next(true);
    this.router.navigate(['/home']);
  }
}