import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  access = '';
  current_user_id = 0;
  myServer = 'http://127.0.0.1:8000/login/';
  constructor(private srv: HttpClient) {}

  do_login(cred: any): Observable<any> {
    console.log('User Logged in');
    return this.srv.post<any>(this.myServer, cred);
  }
}
