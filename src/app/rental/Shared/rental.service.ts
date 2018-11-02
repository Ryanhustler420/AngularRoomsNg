import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RentalService {

      constructor(private http: HttpClient){}
   

      public getRentals(): Observable<any> {
        return this.http.get('/api/v1/rentals'); 
      }

      public getRentalsWithCity(cityName:string){
        return this.http.get(`/api/v1/rentals?city=${cityName}`);
      }

      public getRentalById(rentalId:string) : Observable<any> {
        return this.http.get(`/api/v1/rentals/${rentalId}`);
      }

      public createRental(rental:Rental) : Observable<any>{
        return this.http.post(`/api/v1/rentals`,rental);
      }

      public getUserRentals() :Observable<any>{
        return this.http.get('/api/v1/rentals/manage');
      }

      public deleteRental(id:string): Observable<any> {
        return this.http.delete(`/api/v1/rentals/${id}`);
      }
}