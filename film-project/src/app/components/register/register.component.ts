import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user';
import { UserRegusterRequest } from '../../models/user';

import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userRequest: UserRegusterRequest;
  repeatPassword: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.initUser();
  }

  initUser() {
    this.userRequest = new UserRegusterRequest();
  }

  register() {
    if (this.userRequest.password && (this.userRequest.password === this.repeatPassword)) {
      this.userService.register(this.userRequest).subscribe((response) => {
        console.log(response);
      });
    }
  }

  //MatSnackBarConfig
}
