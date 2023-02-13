import { Component, OnInit  } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import ICustomer from 'src/app/models/Customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer: ICustomer = {
    id: 0,
    name: '',
    age: 0,
    customer_id: 0,
    email: '',
    address: '',
    city: '',
    p_number: 0
  };

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  addCustomer() {
    this.customerService.addCustomer(this.customer).subscribe(res => {
      console.log(res);
    });
  }
}
