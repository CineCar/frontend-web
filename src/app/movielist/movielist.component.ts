import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../services/cart.service';
import { Movie, MovieScreening } from 'com.cinecar.objects';
import { FilterPipe  } from "./filter.pipe";

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
})
export class MovielistComponent implements OnInit {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  public movies;
  private backendService: BackendService;
  private cartService: CartService;
  public search: string ='';


  ngOnInit(): void {
    this.backendService = new BackendService(this.http);
    this.cartService = new CartService(this.http);

    this.backendService.getMovies((movies) => {
      this.movies = movies;
    });
  }

  openSnackBar(movieScreening: MovieScreening) {
    this.cartService.addTicketToCart(movieScreening.getId(), (cart) => {
      this.snackBar.open(`Added ticket for ${movieScreening.getMovie().getName()} to cart 🎟`, 'OK', {
        duration: 3000,
      });
    });
  }
}
