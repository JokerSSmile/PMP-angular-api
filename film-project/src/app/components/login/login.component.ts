import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;
    isLoginError: boolean;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoginError = false;
  }

  onLogin(): void {
    this.userService.login(this.username, this.password)
      .then((isSuccess: boolean) => {
        if (isSuccess) {
          this.router.navigate(['/catalogue']);
        } else {
          this.isLoginError = true;
        }
      });
  }
}
