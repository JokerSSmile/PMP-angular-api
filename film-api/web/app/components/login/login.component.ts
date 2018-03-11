import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserDefault } from '../../models/user';

import { UserService } from '../../services/user-service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.userService.getUser(true).subscribe((user: UserDefault) => {
      if (user) {
        this.router.navigate(['/catalogue']);
      }
    })
  }

  onLogin(): void {
    this.userService.login(this.username, this.password)
      .then((isSuccess: boolean) => {
        if (isSuccess) {
          this.toastr.success('Успешно');
          window.location.href = '/catalogue';
        } else {
          this.toastr.error('Неверные логин или пароль');
        }
      });
  }
}
