import { Component, OnInit } from '@angular/core';
import { Rental } from './../Shared/rental.model';
import { RentalService } from './../Shared/rental.service';

@Component({
  selector: 'bwm-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  newRental: Rental;
  rentalCategories = Rental.CATEGORIES;

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental() {
    this.rentalService.createRental(this.newRental).subscribe((success) => {

    },(err) => {

    });
  }

  handleImageChange(){
    this.newRental.image = 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg';
  }

}
