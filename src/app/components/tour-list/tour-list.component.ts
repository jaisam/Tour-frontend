import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {

  tours = [];

  constructor(private tourService: TourService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllTours();
  }

  getAllTours() {
    this.tourService.getTours()
      .subscribe(res => {
        if (res.status = "success") {
          this.tours = res.data.tours;
        } else {
          console.log(res.message);
        }
      },
        err => {
          // console.log(err.error.message);
          this.toastr.error(err.error.message, '', {
            positionClass: 'toast-top-center',
            timeOut: 3000
          });
        });
  }
}
