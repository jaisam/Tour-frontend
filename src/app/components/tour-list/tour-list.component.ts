import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';


@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {

  tours = [];

  constructor(private tourService: TourService) { }

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
        error => {
          console.log(error);
        });
  }
}
