import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
 baseUrl="http://localhost:3000"
  constructor(private httpClient:HttpClient) { }
  login(user:any): Observable<any> {
    // console.log("inside login service angular")
    return this.httpClient.post<any>(this.baseUrl+"/account/login", user)
      .pipe(
        catchError(error => {
          console.log('Caught in CatchError. Returning 0')
          return error;     
        })
      );
  }
  register(user:any): Observable<any> {
    // console.log("inside register service angular")
    return this.httpClient.post<any>(this.baseUrl+"/account/register", user)
      .pipe(
        catchError(error => {
          console.log('Caught in CatchError. Returning 0')
          return error;     
        })
      );
  }
}
