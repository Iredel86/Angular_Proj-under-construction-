import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  access = '';
  current_user_id = 0;
  myServer = 'http://127.0.0.1:8000/register/';
  constructor(private srv: HttpClient) {}

  do_register(data: any): Observable<any> {
    console.log('User Registered');
    return this.srv.post<any>(this.myServer, data);
  }
}