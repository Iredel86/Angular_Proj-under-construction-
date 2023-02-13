import { Component } from '@angular/core';
import ICustomer from './models/Customer';
import { LoginService } from './services/login.service';
import { CustomerService } from './services/customer.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private custSer: CustomerService, public loginServ: LoginService) {
    if (loginServ.access.length > 1) {
      custSer.getCustomers().subscribe((res) => console.log(res));
    }
  }

  title = '';

  ar: ICustomer[] = [];

  displayInfo = (stuName: string, ind: number) => {
    console.log(ind);
  };
  test() {
    console.log(this.loginServ.access);
  }
  getCustomers() {
    this.custSer.getCustomers().subscribe((res) => (this.ar = res));
  }

  
  
}
