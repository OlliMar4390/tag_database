import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `${error.status}\n${error.statusText || ''}\n${error.error}url: ${error.url}`;
    }

    return throwError(errMsg);
  }
  
  constructor(
    private http: HttpClient
  ) { }

  getLiteralData<T>(route: string): Observable<T> {
    return this.http.get<T>(baseURL + route)
    .pipe(catchError(this.handleError));
  }

  getCollectionData<T>(route: string): Observable<T | any> {
    return this.http.get<T>(baseURL + route)
    .pipe(catchError(this.handleError));
  }

  postData<T>(route: string, data: T): Observable<T> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })};
    return this.http.post<T>(baseURL + route, data, httpOptions)
    .pipe(catchError(this.handleError));
  }
}
