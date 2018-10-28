import { Component, OnInit, Input } from '@angular/core';
import { Booking } from './../../../booking/shared/booking.model';
import { HelperService } from './../../../common/service/helper.service';
import * as moment from 'moment';

@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() price : number;
  @Input() bookings : Booking[];
  newBooking: Booking;

  public daterange: any = {};
  public bookedOutDates: any[] = [];

  public options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    todayText: 'Oggi',
    style: 'big',
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(private helper : HelperService) { }
  
  ngOnInit() {
    this.getBookedOutDates();
    this.newBooking = new Booking();
  }

  private checkForInvalidDates(date){
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDates() {
    if(this.bookings && this.bookings.length > 0){
      this.bookings.forEach((booking: Booking) => {
        const dateRange =  this.helper.getBookingRangeOfDate(booking.startAt,booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  public selectedDate(value: any, datepicker?: any) {
    // datepicker.start = value.start;
    // datepicker.end = value.end;

    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = -(value.start.diff(value.end, 'days'));

    console.log(this.newBooking);
    
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }


}
