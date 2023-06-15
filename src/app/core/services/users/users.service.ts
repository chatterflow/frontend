import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthInterface } from '../../interfaces/auth-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private domain: string | undefined;
  private header = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(private UserService: HttpClient, private router: Router) {
    this.domain = environment.apiUrl;
  }

  async doLoginCall(userEmail: any, userP: any) {
    const url = `${this.domain}/login`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('accept', 'application/json');

    const body = new HttpParams().set('username', userEmail).set('password', userP);

    return this.UserService.post(url, body, { headers }).subscribe({
      next: (res: any) => {localStorage.setItem('token', res.access_token); this.router.navigateByUrl('/dashboard')},
      error: (err) => console.log(err.status)
    });
  }

  getUsers(){
    const url = `${this.domain}/userEverything`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.UserService.get(url, { headers });
  }

  async saveUser(data: any) {
    return this.UserService.post(`${this.domain}/users`, data, { headers: this.header }).subscribe((data) => {
      console.log(data)
    })
  }

  isLoggedIn(){
    const url = `${this.domain}/authorize`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.UserService.get(url, { headers });
  }
}
