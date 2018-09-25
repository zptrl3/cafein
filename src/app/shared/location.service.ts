import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ILocation } from '../shared/location.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  address = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getAllLocations(): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(this.address + 'locations');
  }

  getOneLocation(params): Observable<ILocation> {
    return this.http.get<ILocation>(this.address + 'locations' + '/' + params);
  }

  addLocation(location: ILocation): Observable<ILocation> {
    return this.http.post<ILocation>(this.address + 'locations', JSON.stringify(location), httpOptions).pipe(
      tap(_ => console.log(`Added location w/ name=${location.name}`)),
      catchError(this.handleError<any>('addLocation'))
    );
  }

  updateLocation(params, location: ILocation): Observable<ILocation> {
    return this.http.put<ILocation>(this.address + 'locations/' + params, JSON.stringify(location), httpOptions).pipe(
      tap(_ => console.log(`Updated location id=${params}`)),
      catchError(this.handleError<any>('updateLocation'))
    );
  }

  deleteLocation(params): Observable<ILocation> {
    return this.http.delete<ILocation>(this.address + 'locations/' + params, httpOptions).pipe(
      tap(_ => console.log(`Deleted product id=${params}`)),
      catchError(this.handleError<any>('deletedLocation'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
