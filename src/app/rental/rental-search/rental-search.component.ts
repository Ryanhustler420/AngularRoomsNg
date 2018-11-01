import { Component, OnInit } from '@angular/core';
import { RentalService } from './../Shared/rental.service';
import { Rental } from './../Shared/rental.model';
import { ActivatedRoute } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'bwm-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.scss']
})
export class RentalSearchComponent implements OnInit {

  rentals: Rental[] = [];
  city: string;
  errors: any[] = [];

  constructor(private rentalService:RentalService, private activateRoute: ActivatedRoute) { }
  
  ngOnInit() {
    this.activateRoute.params.subscribe((params) => {
      this.city = params['city'].toUpperCase();
      this.getRentals();
    });
  }
  
  getRentals(){
    this.errors = [];
    this.rentals = [];
    const rentalObservable = this.rentalService.getRentalsWithCity(this.city)
    rentalObservable.subscribe(
        (rentals: Rental[]) => { this.rentals = rentals; },
        (err: HttpErrorResponse) => { this.errors = err.error.error },
        () => {} 
    );
  }

}
