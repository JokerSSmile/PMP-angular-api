import { Component, OnInit } from '@angular/core';
import { CreateFilmRequest } from '../../../models/film';
import { AdminService } from '../../../services/admin-service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  createFilmRequest: CreateFilmRequest;

  private fileReader: FileReader;

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.createFilmRequest = new CreateFilmRequest();
    this.fileReader = new FileReader();
  }

  submit(): void {
    this.adminService.addFilm(this.createFilmRequest).subscribe(response => {
      if (response.isError) {
        this.toastr.error(response.message);
        return;
      }

      this.toastr.success('Фильм успешно добавлен');
    });
  }

  handleFileInput(files: FileList, isSmall: boolean) {
    let file: File = files.item(0);

    this.fileReader.onloadend = (e) => {
      if (isSmall) {
        this.createFilmRequest.imgName = file.name;
        this.createFilmRequest.img = this.fileReader.result
      } else {
        this.createFilmRequest.wideImgName = file.name;
        this.createFilmRequest.wideImg = this.fileReader.result;
      }
    }

    this.fileReader.readAsDataURL(file);
  }
}
