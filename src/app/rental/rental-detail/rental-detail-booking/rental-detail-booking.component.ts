import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Booking } from './../../../booking/shared/booking.model';
import { HelperService } from './../../../common/service/helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Rental } from './../../Shared/rental.model';
import { BookingService } from './../../../booking/shared/booking.service';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty'
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { element } from 'protractor';

@Component({
  selector: 'bwm-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental : Rental;
  @ViewChild(DaterangePickerComponent)
    private picker: DaterangePickerComponent;

  newBooking: Booking;
  closeResult: string;
  modalRef: any;

  public daterange: any = {};
  public bookedOutDates: any[] = [];
  errors: any[] = [];

  public options: any = {
    locale: { format: Booking.DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    todayText: 'Oggi',
    style: 'big',
    isInvalidDate: this.checkForInvalidDates.bind(this),
    autoUpdateInput: false
  };

  constructor(private helper : HelperService,
              private modalService: NgbModal,
              private bookingService : BookingService,
              private toastr:ToastyService, 
              private toastyConfig: ToastyConfig) { 
              this.toastyConfig.theme = 'material';
  }
  
  ngOnInit() {
    this.getBookedOutDates();
    this.newBooking = new Booking();
  }

  addToast(){
    var toastOptions:ToastOptions = {
      title: "Success",
      msg: "Booking has been succesfully created, check your booking detail in manage section",
      showClose: true,
      timeout: 5000,
      theme: 'material'
    };
    this.toastr.success(toastOptions);
  }

  private checkForInvalidDates(date){
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDates() {
    const bookings : Booking[] = this.rental.bookings;

    if(bookings && bookings.length > 0){
      bookings.forEach((booking: Booking) => {
        this.addNewBookedDate(booking);
      });
    }
  }

  openConfirmModel(content) {
    this.picker.datePicker;
    this.errors = [];
    this.modalRef =  this.modalService.open(content);
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  private addNewBookedDate(bookingData: any){
    const dateRange =  this.helper.getBookingRangeOfDate(bookingData.startAt,bookingData.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  createBooking(){
    // console.log(this.newBooking);
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking).subscribe((booking:Booking) => {
      this.addNewBookedDate(booking);
      this.newBooking = new Booking();
      this.modalRef.close();
      this.resetDatePicker();
      this.addToast();
    },
    (errorResponse: any) => {
      //console.log('error in rental-detail-booking component on method createBooking() !');
      this.errors = errorResponse.error.errors;
    });
  }

  public selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = -(value.start.diff(value.end, 'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }


}
