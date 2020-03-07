import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient,  } from '@angular/common/http';
import { BehaviorSubject, Observable  } from 'rxjs';
import {user} from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<user>;
  public currentUser: Observable<user>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<user>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
   }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public get currentUserValue(): user {
    return this.currentUserSubject.value;
}

  url: string = "http://localhost:8080/Year3Project/webresources/user";

  register(details){
    let reg = this.url + "/register"
    let jsonStr = JSON.stringify(details);
    console.log(jsonStr);
    return this.http.post<any>(reg, jsonStr).pipe(map(user => {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
                  return user;
    }));
  }

  login(details){
    let reg = this.url + "/login"
    let jsonStr = JSON.stringify(details);
    console.log(jsonStr);
    return this.http.post<any>(reg, jsonStr).pipe(map(user =>{
      sessionStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
                  
                  return user;

                  
    }));
  }

  logout() {
    // remove user from session storage and set current user to null
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}



}
