import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const host = 'localhost:3000';
const protocol = 'http';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getMovies(callback) {
    this.http.get<any>(`${protocol}://${host}/movies`).subscribe((data) => {
      callback(data.data);
    });
  }
}
