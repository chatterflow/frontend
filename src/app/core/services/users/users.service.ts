import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AuthInterface } from '../../interfaces/auth-interface';
import { ThreadInfo } from '../../interfaces/thread-info';
import { Router } from '@angular/router';
import { ThreadMsg } from '../../interfaces/thread-msg';
import { Observable } from 'rxjs';
import { UserInterface } from '../../interfaces/user-interface';
import { MessageInterface } from '../../interfaces/message-interface';
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
    const url = `${this.domain}/user/login`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('accept', 'application/json');

    const body = new HttpParams().set('username', userEmail).set('password', userP);

    return this.UserService.post(url, body, { headers }).subscribe({
      next: (res: any) => { localStorage.setItem('token', res.access_token); this.router.navigateByUrl('/dashboard') },
      error: (err) => console.log(err.status)
    });
  }

  getUserData(): Observable<UserInterface> {
    const url = `${this.domain}/user/authenticate?token=${localStorage.getItem('token')}`;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.UserService.get<UserInterface>(url, { headers });
  }


  getUsers(userId: string): Observable<ThreadInfo[]> {
    const url = `${this.domain}/thread/participant/${userId}`
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.UserService.get<ThreadInfo[]>(url, { headers });
  }

  async saveUser(data: any) {
    return this.UserService.post(`${this.domain}/user`, data, { headers: this.header }).subscribe((data) => {
      // console.log(data)
    })
  }

  getMsgThread(threadId: string): Observable<ThreadMsg[]> {
    const url = `${this.domain}/messsages/threadId/${threadId}`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    return this.UserService.get<ThreadMsg[]>(url, { headers })
  }

  isLoggedIn() {
    const url = `${this.domain}/authorize`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    return this.UserService.get(url, { headers });
  }
}
