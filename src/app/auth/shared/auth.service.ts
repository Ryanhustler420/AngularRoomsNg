import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as jwt from 'jsonwebtoken';
import 'rxjs/Rx';

class DecodedToken {
    exp: number = 0;
    username: string = '';
}

@Injectable()
export class AuthService {

    private decodedToken: DecodedToken;

    constructor(private http: HttpClient){}

    public register(userData: any): Observable<any>{
        return this.http.post('/api/v1/users/register', userData);
    }

    public login(userData: any): Observable<any> {
        return this.http.post('/api/v1/users/auth', userData)
        .map((token) => this.setToken(token));
    }

    public setToken(token): string {
        this.decodedToken = jwt.decode(token);
        localStorage.setItem('bwm_auth',token);
        debugger;
        localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
        return token;
    }

    // public logOut() {
    //     var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     var token = currentUser.token; // your token
    // }

}