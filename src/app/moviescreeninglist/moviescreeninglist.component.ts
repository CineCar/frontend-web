import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieScreening } from 'com.cinecar.objects';
import { BackendService } from '../services/backend.service';

@Component({
  templateUrl: './moviescreeninglist.component.html',
  styleUrls: ['./moviescreeninglist.component.css'],
})
export class MoviescreeninglistComponent implements OnInit {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  public movieScreenings;
  private backendService;
  private cartService;

  ngOnInit(): void {
    this.backendService = new BackendService(this.http);
    this.cartService = new BackendService(this.http);

    this.backendService.getMovieScreenings((movieScreenings) => {
      this.movieScreenings = movieScreenings;
    });
  }

  openSnackBar(movieScreening: MovieScreening) {
    console.log(movieScreening);

    this.cartService.addTicketToCart(movieScreening.getId(), (cart) => {
      this.snackBar.open(
        `Added ticket for ${movieScreening.getMovie().getName()} to cart 🎟`,
        'OK',
        {
          duration: 1000,
        }
      );
    });
  }
}
