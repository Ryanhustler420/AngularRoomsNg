import { Component, OnInit } from '@angular/core';
import { RentalService } from './../../rental/Shared/rental.service';
import { Rental } from './../../rental/Shared/rental.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty'

@Component({
  selector: 'bwm-manage-rentals',
  templateUrl: './manage-rentals.component.html',
  styleUrls: ['./manage-rentals.component.scss']
})
export class ManageRentalsComponent implements OnInit {

  rentals: Rental[];
  rentalDeleteIndex: number;

  constructor(
              private rentalService: RentalService,
              private toastr:ToastyService, 
              private toastyConfig: ToastyConfig
             ) {this.toastyConfig.theme = 'material';}

  ngOnInit() {
    this.rentalService.getUserRentals().subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
      },
      (err: HttpErrorResponse) => {
        // called here addToast(err)
      }
    )
  }

  addToast(message:string){
    var toastOptions:ToastOptions = {
      title: "Failed",
      msg: message,
      showClose: true,
      timeout: 5000,
      theme: 'material'
    };
    this.toastr.error(toastOptions);
  }

  deleteRental(id: string) {
    this.rentalService.deleteRental(id).subscribe(
      (onSuccess) => {
        if (this.rentalDeleteIndex > -1) {
          this.rentals.splice(this.rentalDeleteIndex, 1);
        }
        this.toastr.success("Rental Removed");
        this.rentalDeleteIndex = undefined;
      },(error: HttpErrorResponse) => {
        this.addToast(error.error.error[0].detail);
        this.rentalDeleteIndex = undefined;
      }
    )    
  }

}
