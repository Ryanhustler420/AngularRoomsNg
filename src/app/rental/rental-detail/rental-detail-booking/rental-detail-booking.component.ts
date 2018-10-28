import { Component, OnInit, Input } from '@angular/core';
import { Booking } from './../../../booking/shared/booking.model';
import { HelperService } from './../../../common/service/helper.service';

@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() price : number;
  @Input() bookings : Booking[];

  public daterange: any = {};
  public bookedOutDates: any[] = [];

  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    opens: 'left',
    todayText: 'Oggi',
    style: 'big'
  };

  constructor(private helper : HelperService) { }
  
  ngOnInit() {
    this.getBookedOutDates();
  }

  private getBookedOutDates() {
    if(this.bookings && this.bookings.length > 0){
      this.bookings.forEach((booking: Booking) => {
        const dateRange =  this.helper.getRangeDates(booking.startAt,booking.endAt);
        this.bookedOutDates.push(...dateRange);
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
