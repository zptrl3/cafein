import { Component, OnInit } from '@angular/core';
import { LocationService } from '../shared/location.service';
import { ILocation } from '../shared/location.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  allLocations: any = [];
  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locationService.getAllLocations().subscribe(res => {
      this.allLocations = res['content'];
      console.log(res);
    },
      err => {
        console.log(err);
      });
  }
}
