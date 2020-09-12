import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, Movie, MovieScreening } from 'com.cinecar.objects';

const host = 'api.ticketshop.mixify.ga';
const protocol = 'https';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) { }

  getMovies(callback) {
    this.fetch("GET", "movies", (json) => {

      const movies: Array<Movie> = [];

      json.forEach((jsonMovie) => {
        movies.push(Movie.fromJSON(jsonMovie));
      });

      callback(movies);
    });
  }

  getMovie(id: number, callback) {
    this.fetch("GET", `movies/${id}`, (json) => {
      callback(Movie.fromJSON(json));
    });
  }

  getMovieScreenings(callback) {
    this.fetch("GET", "movie-screenings", (json) => {
      const moviesScreenings: Array<MovieScreening> = [];

      json.forEach((jsonMovieScreening) => {
        moviesScreenings.push(MovieScreening.fromJSON(jsonMovieScreening));
      });

      callback(moviesScreenings);
    });
  }

  createCart(callback) {
    this.fetch("POST", "carts", (json) => {
      callback(Cart.fromJSON(json));
    }, {});
  }

  getCart(id: number, callback) {
    this.fetch("GET", `carts/${id}`, (json) => {
      callback(Cart.fromJSON(json));
    });
  }

  addTicketToCart(id: number, movieScreeningId: number, callback) {
    this.fetch("POST", `carts/${id}`, (json) => {
      callback(Cart.fromJSON(json));
    }, { movieScreeningId: movieScreeningId })
  }

  private fetch(requestMethod: string, endpoint: string, callback, httpbody?: any) {



    if (requestMethod === "GET") {

      this.http.get<any>(`${protocol}://${host}/${endpoint}`).subscribe((data) => {
        callback(data.data);
      });

    } else if (requestMethod === "POST") {
      this.http.post<any>(`${protocol}://${host}/${endpoint}`, httpbody).subscribe((data) => {
        callback(data.data);
      });
    }
  }
}
