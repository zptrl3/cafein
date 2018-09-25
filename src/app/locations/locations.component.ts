import { Component, OnInit } from '@angular/core';
import { LocationService } from '../shared/location.service';
import { ILocation } from '../shared/location.model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  allLocations: any = [];

  constructor(private locationService: LocationService) { }

  ngOnInit() {
  }

  getLocations() {
    this.locationService.getAllLocations().subscribe(res => {
      this.allLocations = res;
      console.log(res);
    },
      err => {
        console.log(err);
      });
  }
}
