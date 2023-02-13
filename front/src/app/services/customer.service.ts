import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ICustomer from '../models/Customer';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  myServer = 'http://127.0.0.1:8000/customers/';

  constructor(private srv: HttpClient, private logServ: LoginService) {}

  getCustomers(): Observable<ICustomer[]> {
    // console.log('aaaaaaaa', this.logServ.access);
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.logServ.access}`,
    };
    const requestOptions = { headers: headers };
    return this.srv.get<ICustomer[]>(this.myServer, requestOptions);
  }

  addCustomer(newCustomer: ICustomer): Observable<any> {
    console.log('first');
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.logServ.access}`,
    };
    const requestOptions = { headers: headers };
    return this.srv.post<ICustomer>(this.myServer, newCustomer, requestOptions);
  }
}
