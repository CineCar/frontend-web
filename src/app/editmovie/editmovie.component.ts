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
  private formBuilder: FormBuilder;
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

    this.backendService.getMovie(
      parseInt(this.route.snapshot.paramMap.get('id')),
      (movie: Movie) => {
        console.log(movie);
        this.editForm.controls['name'].setValue(movie.getName());
        this.editForm.controls['duration'].setValue(movie.getDuration());
        this.editForm.controls['price'].setValue(movie.getPrice());
        this.editForm.controls['imageUrl'].setValue(movie.getImageUrl());
        
      }
    );
    
  }
  onSubmit(){
    let newMovie: Movie;


    newMovie.setId(this.movie.getId());
    newMovie.setName(this.editForm.get('name').value);
    newMovie.setDuration(this.editForm.get('duration').value);
    newMovie.setPrice(this.editForm.get('price').value);
    newMovie.setImageUrl(this.editForm.get('imageUrl').value);

    this.backendService.updateMovieInformation(newMovie, (movie: Movie) => {
      this.movie = movie;
    });


    




  }
}
