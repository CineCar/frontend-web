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
    this.fetch("GET", "movies", (movies) => {
      callback(<Movie[]>movies);
    });
  }
  getMovie(id: number, callback) {
    this.fetch("GET", `movies/${id}`, (movie) => {
      callback(<Movie>movie);
    });
  }
  getMovieScreenings(callback) {
    this.fetch("GET", "movie-screenings", (movieScreening) => {
      callback(<MovieScreening>movieScreening);
    });
  }
  createCart(callback) {
    this.fetch("POST", "carts", (cart) => {
      callback(<Cart>cart);
    }, {});
  }
  getCart(id: number, callback) {

    this.fetch("GET", `carts/${id}`, (cart) => {
      callback(<Cart>cart);
    });
  }
  addTicketToCart(id: number, movieScreeningId: number, callback) {
    this.fetch("POST", `carts/${id}`, (cart) => {
      callback(<Cart>cart);
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
