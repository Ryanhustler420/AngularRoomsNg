import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Booking } from './../../booking/shared/booking.model';

@Injectable()
export class HelperService {

    private getRangeDates(startAt, endAt, format){
        const tempDates = [];
        const mEndAt = moment(endAt);
        let mStartAt = moment(startAt);

        while(mStartAt < mEndAt){
            tempDates.push(mStartAt.format(format));
            mStartAt = mStartAt.add(1, 'day');
        }

        tempDates.push(moment(startAt).format(format));
        tempDates.push(mEndAt.format(format));

        return tempDates;
    }

    public formatDate(date, dateformat) {
        return moment(date).format(dateformat);
    }

    public formatBookingDate(date){
        return this.formatDate(date,Booking.DATE_FORMAT);
    }

    public getBookingRangeOfDate(startAt, endAt){
        return this.getRangeDates(startAt, endAt, Booking.DATE_FORMAT);
    }

}