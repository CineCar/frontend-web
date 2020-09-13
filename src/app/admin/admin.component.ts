import { Component, OnInit } from '@angular/core';
import { Movie } from 'com.cinecar.objects';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private backendService: BackendService;

  public movies: Movie[];

  constructor(backendService: BackendService) { 
    this.backendService = backendService;
  }

  ngOnInit(): void {

    this.backendService.getMovies((movies) => {

      this.movies = movies;

    });
  }
  deleteMovie(id: number){

  }
  addMovie(){
    
  }

}
