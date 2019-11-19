import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css']
})
export class TourDetailsComponent implements OnInit {

  tour;
  stars = [1,2,3,4,5];
  constructor(private route: ActivatedRoute, private router: Router, private tourService: TourService) { }

  ngOnInit() {
    let slug = this.route.snapshot.paramMap.get('slug'); // paramMap fetches parameter from /tour-details url sent via tour-card
    this.tourService.getTour(slug)
      .subscribe(res => {
        if(res.status === "success"){
          this.tour = res.data.tour;
        }
      },
        error => {
          console.log(error);
        });
  }

}
