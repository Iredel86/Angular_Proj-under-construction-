import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IAppointment from '../models/Appointment';
import { LoginService } from './login.service';
import ICustomer from '../models/Customer';
import ITreatment from '../models/Treatment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  myServer = 'http://127.0.0.1:8000/appointments/';

  constructor(private srv: HttpClient, private logServ: LoginService) {}

  getAppointments(): Observable<IAppointment[]> {
    // console.log('aaaaaaaa', this.logServ.access);
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.logServ.access}`,
    };
    const requestOptions = { headers: headers };
    return this.srv.get<IAppointment[]>(this.myServer, requestOptions);
  }

  addAppointment(newAppointment: IAppointment): Observable<any> {
    console.log('first');
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.logServ.access}`,
    };
    const requestOptions = { headers: headers };
    return this.srv.post<IAppointment>(this.myServer, newAppointment, requestOptions);
  }

  getCustomers(): Observable<ICustomer[]> {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.logServ.access}`,
    };
    const requestOptions = { headers: headers };
    return this.srv.get<ICustomer[]>(`http://127.0.0.1:8000/customers/`, requestOptions);
  }

  getTreatments(): Observable<ITreatment[]> {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.logServ.access}`,
    };
    const requestOptions = { headers: headers };
    return this.srv.get<ITreatment[]>(`http://127.0.0.1:8000/treatments/`, requestOptions);
  }
}