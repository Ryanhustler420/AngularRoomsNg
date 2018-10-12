import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';

@Injectable()
export class RentalService {

    private rentals: Rental[] = [{
        id:'1',
        title: "Central Apartment",
        city: "New York",
        street: "Times Square",
        category: "apartment",
        image:"http://via.placeholder.com/350x250",
        bedrooms:3,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: false,
        createdAt: '24/12/2018'
      },{
        id:'2',
        title: "Central Apartment 2",
        city: "Chicago",
        street: "philidophia Square",
        category: "apartment",
        image:"http://via.placeholder.com/350x250",
        bedrooms:8,
        description: "Very cool apartment",
        dailyRate: 59,
        shared: false,
        createdAt: '12/10/2017'
      },{
        id:'3',
        title: "Central House",
        city: "New York",
        street: "quick town",
        category: "House",
        image:"http://via.placeholder.com/350x250",
        bedrooms:3,
        description: "cant bet better than this House",
        dailyRate: 109,
        shared: false,
        createdAt: '1/1/2013'
      },{
        id:'4',
        title: "Gupta Apartment",
        city: "Jamshedpur",
        street: "Lal Building",
        category: "Hotel",
        image:"http://via.placeholder.com/350x250",
        bedrooms:3,
        description: "Had bad Exprience!",
        dailyRate: 6,
        shared: true,
        createdAt: '6/07/2016'
      }];

      public getRentals(): Observable<Rental[]> {
          const rentalObservable:Observable<Rental[]> = new Observable((observer) => {
            setTimeout(() => {
              observer.next(this.rentals);
            },1000);

            setTimeout(() => {
              observer.error("Something went wrong!");
            },2000);

            setTimeout(() => {
              observer.complete();
            },3000);

          });
          return rentalObservable;
      }

      public getRentalById(rentalId:string) : Observable<Rental> {
        return new Observable<Rental>((observer) => {
          setTimeout(() => {
           const foundRental = this.rentals.find((rental) => rental.id == rentalId);
           observer.next(foundRental);
          },500);
        });
      }

}