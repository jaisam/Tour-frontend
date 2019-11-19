import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-card',
  templateUrl: './tour-card.component.html',
  styleUrls: ['./tour-card.component.css']
})
export class TourCardComponent implements OnInit {

  @Input() tour;

  constructor(private route: Router) { }

  ngOnInit() {
    // console.log('Inside ngOnInit ', this.tour);
  }

  tourDetailsRoute(tour) {
    this.route.navigate(['/tour-details', tour.slug ]); // tour.slug is parameter for /tour-details url
  }

}
