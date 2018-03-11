import { Component, OnInit } from '@angular/core';
import { CreateFilmRequest } from '../../../models/film';
import { AdminService } from '../../../services/admin-service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  createFilmRequest: CreateFilmRequest;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.createFilmRequest = new CreateFilmRequest();
  }

  submit(): void {
    this.adminService.addFilm(this.createFilmRequest).subscribe(response => {
      console.log();
    });
  }
}
