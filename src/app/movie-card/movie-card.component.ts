import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';//Display notification

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  favMovies: any = [];

  constructor(
    public fetchApiDataService: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();

  }

  /**
   * Fetch movies via API and set movies variable to returned array of movie objects
   * @returns an array holding movie objects
   */
  getMovies(): void {
    this.fetchApiDataService.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      //console.log('getMovies():', this.movies);
      return this.movies;
    })
  }

  /**
   * Fetch user data via API and set favourite movies state to returned data 
   * @returns an array of user's favorite movie IDs
   * @function getFavMovies
   */
  getFavMovies(): void {
    this.fetchApiDataService.getUser().subscribe((resp: any) => {
      this.favMovies = resp.FavoriteMovies;
      console.log(this.favMovies)
      return this.favMovies;
    })
  }

  /**
   * Adds the movie to user's favourites or remove one if it is in the favorites list 
   * and update favourite movies state
   * @param {string} movieId 
   * @returns updates user object
   * @function toggleFavMovie
   */
  toggleFavMovie(movieId: string): void {
    if (!this.favMovies.includes(movieId)) {
      // Adds a movie to favorite
      this.fetchApiDataService.addFavMovie(movieId).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.favMovies = resp.FavoriteMovies;
          this.snackBar.open('Added to favorite!', 'OK', { duration: 2000 });
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open(error, 'OK', { duration: 2000 })
        },
      })
    } else {
      // Removes a movie from favorite
      this.fetchApiDataService.deleteFavMovie(movieId).subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.favMovies = resp.FavoriteMovies;
          this.snackBar.open('Removed from favorite', 'OK', { duration: 2000 });
        },
        error: (error) => {
          console.log(error);
          this.snackBar.open(error, 'OK', { duration: 2000 })
        },
      })
    }
  }


  /**
   * Opens GenreComponent as a dialog
   * @param name - name of the genre
   * @param description - description of the genre
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      }
    });
  }

  /**
   * Opens DirectorComponent as a dialog
   * @param name - name of the director
   * @param bio - bio of the director
   * @param birth - birthyear of the director
   */
  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth
      }
    });
  }

  /**
   * Opens SynopsisComponent as a dialog
   * @param title - title of the movie
   * @param description - description of the movie
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Name: title,
        Description: description
      }
    });
  }



}