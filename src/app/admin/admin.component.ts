import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { Movie } from 'com.cinecar.objects';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  private backendService: BackendService;

  public movies: Movie[];

  constructor(backendService: BackendService, public dialog: MatDialog) {
    this.backendService = backendService;
  }

  ngOnInit(): void {
    this.backendService.getMovies((movies) => {
      this.movies = movies;
    });
  }
  deleteMovie(id: number) {}
  createMovie() {
    const dialogRef = this.dialog.open(CreateMovieDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'create-movie-dialog',
  templateUrl: './create-movie-dialog.html',
})
export class CreateMovieDialog {}
