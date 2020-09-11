import { Component, OnInit, NgModule } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
})
export class MovielistComponent implements OnInit {
  constructor(private http: HttpClient) {}

  public movies;

  ngOnInit(): void {
    new BackendService(this.http).getMovies((movies) => {
      this.movies = movies;
    });
  }
}
