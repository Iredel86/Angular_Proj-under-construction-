import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private loginServ: LoginService) {}

  login(user: string, pwd: string) {
    this.loginServ
      .do_login({
        username: user,
        password: pwd,
      })
      .subscribe((res) => (this.loginServ.access = res.access));

    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(this.loginServ.access);
    try {
      console.log(decodedToken.user_id);
      this.loginServ.current_user_id = decodedToken.user_id;
    } catch (Error) {}
  }
}
