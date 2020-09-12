import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const host = 'api.ticketshop.mixify.ga';
const protocol = 'https';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getMovies(callback) {
    this.fetch("GET", "movies", callback);
  }
  getMovie(id: number, callback){
    this.fetch("GET", `movies/${id}`, callback);
  }
  getMovieScreenings(callback){
    this.fetch("GET", "movie-screenings", callback);
  }
  createCart(callback){
    this.fetch("POST","carts", callback, {});
  }
  getCart(id: number, callback){

    this.fetch("GET", `carts/${id}`, callback);
  }

  private fetch(requestMethod: string, endpoint: string, callback, httpbody?: any ){



    if(requestMethod === "GET"){

      this.http.get<any>(`${protocol}://${host}/${endpoint}`).subscribe((data) => {
        callback(data.data);
      });

    } else if( requestMethod === "POST"){
      this.http.post<any>(`${protocol}://${host}/${endpoint}`,httpbody).subscribe((data) => {
        callback(data.data);
      });
    }    
  }
}
