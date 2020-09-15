import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cart, Movie, MovieScreening } from 'com.cinecar.objects';

const host = 'api.ticketshop.mixify.ga';
const protocol = 'https';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': `${localStorage.getItem('com.cinecar.Session.Id')}:${localStorage.getItem('com.cinecar.Session.Token')}`
  })
};

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  updateMovieInformation(newMovie: Movie, callback) {
    this.fetch("POST", `movies/${newMovie.getId()}`,(json) =>{
      callback(Movie.fromJSON(json));
    }, newMovie.toJSON());
  }
  constructor(private http: HttpClient) {}

  getMovies(callback) {
    this.fetch('GET', 'movies', (json) => {
      const movies: Array<Movie> = [];

      json.forEach((jsonMovie) => {
        movies.push(Movie.fromJSON(jsonMovie));
      });

      callback(movies);
    });
  }

  searchMovies(query, callback) {
    this.fetch('GET', 'movies?search=' + encodeURIComponent(query), (json) => {
      const movies: Array<Movie> = [];

      json.forEach((jsonMovie) => {
        movies.push(Movie.fromJSON(jsonMovie));
      });

      callback(movies);
    });
  }

  getMovie(id: number, callback) {
    this.fetch('GET', `movies/${id}`, (json) => {
      callback(Movie.fromJSON(json));
    });
  }

  getMovieScreenings(callback) {
    this.fetch('GET', 'movie-screenings?nextWeeks=true', (json) => {
      const moviesScreenings: Array<MovieScreening> = [];

      json.forEach((jsonMovieScreening) => {
        moviesScreenings.push(MovieScreening.fromJSON(jsonMovieScreening));
      });

      callback(moviesScreenings);
    });
  }

  createCart(callback) {
    this.fetch(
      'POST',
      'carts',
      (json) => {
        callback(Cart.fromJSON(json));
      },
      {}
    );
  }

  deleteMovie(id, callback) {
    this.fetch('DELETE', `movies/${id}`,(json) => {
      callback();
    });
  }

  getCart(id: number, callback) {
    this.fetch('GET', `carts/${id}`, (json) => {
      callback(Cart.fromJSON(json));
    });
  }

  addTicketToCart(id: number, movieScreeningId: number, callback) {
    this.fetch(
      'POST',
      `carts/${id}/tickets`,
      (json) => {
        callback(Cart.fromJSON(json));
      },
      { movieScreeningId: movieScreeningId }
    );
  }

  removeTicketFromCart(cartId: number, ticketId: number, callback) {
    this.fetch('DELETE', `carts/${cartId}/tickets/${ticketId}`, (json) => {
      callback(Cart.fromJSON(json));
    });
  }

  login(username: string, password: string, callback) {
    this.fetch(
      'POST',
      `login`,
      (session, err) => {
        if (err) callback(false);
        else {
          localStorage.setItem('com.cinecar.Session.Id', session.id);
          localStorage.setItem('com.cinecar.Session.Token', session.token);
          callback(true);
        }
      },
      { id: username, password: password }
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('com.cinecar.Session.Id') != null;
  }

  private fetch(requestMethod: string, endpoint: string, callback, body?: any) {
    document.querySelector('.spinner').classList.remove('hide');

    

    try {
      if (requestMethod === 'GET') {
        this.http
          .get<any>(`${protocol}://${host}/${endpoint}`,
          {
           headers:{
            'Content-Type':  'application/json',
            'Authorization': `${localStorage.getItem('com.cinecar.Session.Id')}:${localStorage.getItem('com.cinecar.Session.Token')}`
           } 
          })
          .subscribe((data) => {
            document.querySelector('.spinner').classList.add('hide');
            callback(data.data, data.error);
          });
      } else if (requestMethod === 'POST') {
        this.http
          .post<any>(
            `${protocol}://${host}/${endpoint}`,
            JSON.stringify(body),
            {
              headers:{
               'Content-Type':  'application/json',
               'Authorization': `${localStorage.getItem('com.cinecar.Session.Id')}:${localStorage.getItem('com.cinecar.Session.Token')}`
              } 
            }
          )
          .subscribe((data) => {
            document.querySelector('.spinner').classList.add('hide');
            callback(data.data, data.error);
          });
      } else if (requestMethod === 'DELETE') {
        this.http
          .delete<any>(`${protocol}://${host}/${endpoint}`,
          {
            headers:{
             'Content-Type':  'application/json',
             'Authorization': `${localStorage.getItem('com.cinecar.Session.Id')}:${localStorage.getItem('com.cinecar.Session.Token')}`
            } 
           })
          .subscribe((data) => {
            document.querySelector('.spinner').classList.add('hide');
            callback(data.data, data.error);
          });
      }
    } catch (err) {
      document.querySelector('.spinner').classList.add('hide');
    }
  }
}
