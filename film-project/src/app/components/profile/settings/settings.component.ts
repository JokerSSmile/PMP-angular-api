import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user-service/user.service';
import { SettingsRequest } from '../../../models/settings';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse } from '../../../models/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(forceUpdate?: boolean): void {
    this.userService.getUser(forceUpdate).subscribe((user: User) => {
      this.user = user;
    });
  }

  saveSettings(): void {
    let request: SettingsRequest = {
      firstName: this.user.first_name,
      surname: this.user.surname,
      age: this.user.age,
      gender: this.user.gender,
      phone: this.user.phone
    };

    this.userService.saveSettings(request).subscribe((response: BaseResponse) => {
      if (response.isError) {
        this.toastr.error(response.message);
        return;
      }

      this.toastr.success('Настройки обновлены!');
      this.getUser(true);
    });
  }
}
