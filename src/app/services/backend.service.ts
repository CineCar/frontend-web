import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const host = 'api.ticketshop.mixify.ga';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getMovies(callback) {
    this.http.get<any>(`https://${host}/movies`).subscribe((data) => {
      callback(data.data);
    });
  }
}
