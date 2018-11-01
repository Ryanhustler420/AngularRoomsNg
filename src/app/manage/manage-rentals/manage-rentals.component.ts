import { Component, OnInit } from '@angular/core';
import { RentalService } from './../../rental/Shared/rental.service';
import { Rental } from './../../rental/Shared/rental.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bwm-manage-rentals',
  templateUrl: './manage-rentals.component.html',
  styleUrls: ['./manage-rentals.component.scss']
})
export class ManageRentalsComponent implements OnInit {

  rentals: Rental[] = [];
  errors: any[] = [];

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.rentalService.getUserRentals().subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      (err: HttpErrorResponse) => {
        this.errors = err.error.errors;
      }
    )
  }

}
