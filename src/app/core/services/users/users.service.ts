import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private domain: string | undefined;
  private header = new HttpHeaders({
    contentType: 'application/json'
  })
  constructor(private UserService: HttpClient) { 
    this.domain = environment.apiUrl;
  }

  doLoginCall(userEmail: any, userP: any) {
    return this.UserService.get(`${this.domain}/userES?userEmail=${encodeURIComponent(userEmail)}&userP=${encodeURIComponent(userP)}`);
  }

  saveUser(data: any){
    return this.UserService.post(`${this.domain}/users`, data, {headers: this.header}).subscribe((data) => {
      console.log(data)
    })
  }
}
    