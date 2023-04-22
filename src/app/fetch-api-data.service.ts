import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(credentials: any): Observable<any> {
    return this.http.post(apiUrl + 'login', credentials).pipe(
      catchError(this.handleError)
    );
  }

  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies').pipe(
      catchError(this.handleError)
    );
  }

  public getMovie(movieId: string): Observable<any> {
    return this.http.get(apiUrl + 'movies/' + movieId).pipe(
      catchError(this.handleError)
    );
  }

  public getDirector(directorName: string): Observable<any> {
    return this.http.get(apiUrl + 'movies?Director=' + directorName).pipe(
      catchError(this.handleError)
    );
  }

  public getGenre(genreName: string): Observable<any> {
    return this.http.get(apiUrl + 'movies?Genre=' + genreName).pipe(
      catchError(this.handleError)
    );
  }

  public getUser(userId: string): Observable<any> {
    return this.http.get(apiUrl + 'users/' + userId).pipe(
      catchError(this.handleError)
    );
  }

  public getFavoriteMovies(userId: string): Observable<any> {
    return this.http.get(apiUrl + 'users/' + userId + '/favorites').pipe(
      catchError(this.handleError)
    );
  }

  public addFavoriteMovie(userId: string, movieId: string): Observable<any> {
    return this.http.post(apiUrl + 'users/' + userId + '/favorites/' + movieId, {}).pipe(
      catchError(this.handleError)
    );
  }

  public editUser(userId: string, userData: any): Observable<any> {
    return this.http.put(apiUrl + 'users/' + userId, userData).pipe(
      catchError(this.handleError)
    );
  }

  public deleteUser(userId: string): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + userId).pipe(
      catchError(this.handleError)
    );
  }

  public deleteFavoriteMovie(userId: string, movieId: string): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + userId + '/favorites/' + movieId).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
