import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
})
export class MovielistComponent implements OnInit {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  public movies;

  ngOnInit(): void {
    new BackendService(this.http).getMovies((movies) => {
      this.movies = movies;
    });
  }

  openSnackBar() {
    this._snackBar.open('Added ticket to cart 🎟', 'OK', {
      duration: 3000,
    });
  }
}
