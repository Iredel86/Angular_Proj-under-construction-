import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private registerServ: RegisterService) {}

  register(username: string, email: string, password: string, confirmPassword: string ) {
    this.registerServ
      .do_register({
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .subscribe((res) => (this.registerServ.access = res.access));

    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(this.registerServ.access);
    try {
      console.log(decodedToken.user_id);
      this.registerServ.current_user_id = decodedToken.user_id;
    } catch (Error) {}
  }
}
