import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'com.cinecar.objects';
import { BackendService } from '../services/backend.service';
import { CartService } from '../services/cart.service';

@Component({
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css'],
})
export class EditmovieComponent implements OnInit {
  private backendService: BackendService;
  public editForm;
  public movie: Movie;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    backendService: BackendService,
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.backendService = backendService;

    
    this.editForm = formBuilder.group({
        name: '',
        duration: '',
        price: '',
        imageUrl: ''
      });
  }

  ngOnInit(): void {
    this.backendService = new BackendService(this.http);

    this.backendService.getMovie(
      parseInt(this.route.snapshot.paramMap.get('id')),
      (movie) => {
        console.log(movie);
      }
    );
  }
  onSubmit(name, duration, price, imageUrl){

  }
}
