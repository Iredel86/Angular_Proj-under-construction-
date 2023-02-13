import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ITreatment from '../models/Treatment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class TreatmentService {
  myServer = 'http://127.0.0.1:8000/treatments/';

  constructor(private srv: HttpClient, private logServ: LoginService) {}

  getTreatments(): Observable<ITreatment[]> {
    // console.log('aaaaaaaa', this.logServ.access);
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.logServ.access}`,
    };
    const requestOptions = { headers: headers };
    return this.srv.get<ITreatment[]>(this.myServer, requestOptions);
  }

  addTreatment(newTreatment: ITreatment): Observable<any> {
    console.log('first');
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.logServ.access}`,
    };
    const requestOptions = { headers: headers };
    return this.srv.post<ITreatment>(this.myServer, newTreatment, requestOptions);
  }
}