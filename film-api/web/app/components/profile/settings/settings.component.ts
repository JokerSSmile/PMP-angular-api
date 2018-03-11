import { Component, OnInit } from '@angular/core';
import { UserExtended } from '../../../models/user';
import { UserService } from '../../../services/user-service/user.service';
import { SettingsRequest } from '../../../models/settings';
import { ToastrService } from 'ngx-toastr';
import { BaseResponse } from '../../../models/common';
import { ProfileService } from '../../../services/profile-service/profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: UserExtended;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(forceUpdate?: boolean): void {
    this.userService.getUser(forceUpdate).subscribe(user => {
      this.profileService.getUserProfile(user.id).subscribe(user => {
        this.user = user;
      })
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

      this.toastr.success('Настройки обновлены');
      this.getUser(true);
    });
  }
}
