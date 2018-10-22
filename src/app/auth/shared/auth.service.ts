import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient){}

    public register(userData: any): Observable<any>{
        return this.http.post('/api/v1/users/register', userData);
    }

    public login(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/auth', userData)
        .map((token) => this.setToken(token));
    }

    public setToken(token): string {
        localStorage.setItem('bwm_auth',token);
        return token;
    }

    // public logOut() {
    //     var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     var token = currentUser.token; // your token
    // }

}