import { Component, OnInit } from '@angular/core';
import { Booking } from './../../booking/shared/booking.model';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingService } from './../../booking/shared/booking.service';

@Component({
  selector: 'bwm-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss']
})
export class ManageBookingsComponent implements OnInit {

  bookings: Booking[] = [];
  errors: any[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getUserBookings().subscribe(
      (booking:Booking[]) => {
        this.bookings = booking;
      },
      (err: HttpErrorResponse) => {
        this.errors = err.error.errors;
      }
    )
  }

}
