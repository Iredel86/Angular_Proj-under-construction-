import { Component, OnInit } from '@angular/core';
import IAppointment from 'src/app/models/Appointment';
import ICustomer from 'src/app/models/Customer';
import ITreatment from 'src/app/models/Treatment';
import { AppointmentService } from 'src/app/services/appointment.service';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})

export class AppointmentComponent implements OnInit {
  appointment: IAppointment = {
    id: 0,
    customer: {} as ICustomer,
    treatment: {} as ITreatment,
    date: '',
    time: '',
    status: '',
  };
  customers: ICustomer[] = [];
  treatments: ITreatment[] = [];
  

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.appointmentService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
    this.appointmentService.getTreatments().subscribe(treatments => {
      this.treatments = treatments;
    });
  }



  addAppointment() {
    this.appointmentService.addAppointment(this.appointment).subscribe(res => {
      console.log(res);
    });
  }
}
