import { Component, OnInit, Input } from '@angular/core';
import { Booking } from './../../../booking/shared/booking.model';

@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() price : number;
  @Input() bookings : Booking[];

  public daterange: any = {};

  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    opens: 'left',
    todayText: 'Oggi',
    style: 'big'
  };

  constructor() { }
  
  ngOnInit() {
    this.getBookedOutDates();
  }

  private getBookedOutDates() {
    if(this.bookings && this.bookings.length > 0){
      this.bookings.forEach((booking: Booking) => {
        console.log(booking);
      });
    }
  }

  public selectedDate(value: any, datepicker?: any) {
    datepicker.start = value.start;
    datepicker.end = value.end;
    
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }


}
