import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { User, Gender, Password, UserRegusterRequest, UserRegisterPreRequest } from '../../models/user';
import { UserRegisterResponse } from '../../models/common';

import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerRequest: UserRegusterRequest;
  registerPreRequest: UserRegisterPreRequest;
  step: number;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getUser(true).subscribe((user: User) => {
      if (user) {
        this.router.navigate(['/catalogue']);
      } else {
        this.initUser();
        this.step = 0;
      }
    });
  }

  initUser() {
    this.registerRequest = new UserRegusterRequest();
    this.registerPreRequest = new UserRegisterPreRequest();
    this.registerPreRequest.plainPassword = new Password();
  }

  preRegister() {
    this.userService.preRegister(this.registerPreRequest).subscribe((response: UserRegisterResponse) => {
      if (!response.isError) {
        this.toastr.success('Пользователь создан!');
        this.registerRequest.id = response.userId;
        this.step++;
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  register() {
    this.userService.register(this.registerRequest).subscribe((response) => {
      this.toastr.success('Регистрация прошла успешно!');
      this.router.navigate(['/login']);
    });
  }
}
