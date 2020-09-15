import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import {
  MatDialog,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Inject } from '@angular/core';
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
  public dialogRef;
  private deleteMovieDialog;

  constructor(
    backendService: BackendService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.backendService = backendService;
  }

  ngOnInit(): void {
    this.backendService.getMovies((movies) => {
      this.movies = movies;
    });
  }
  deleteMovie(movie: Movie) {
    this.deleteMovieDialog = this.dialog.open(DeleteMovieDialog, {
      data: {
        movie: movie,
      },
    });
  }

  createMovie() {
    this.dialogRef = this.dialog.open(CreateMovieDialog);
  }
}

@Component({
  selector: 'create-movie-dialog',
  templateUrl: './create-movie-dialog.html',
})
export class CreateMovieDialog implements OnInit {
  public createMovieForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateMovieDialog>,
    private formBuilder: FormBuilder,
    public backendService: BackendService
  ) {
    this.createMovieForm = formBuilder.group({
      name: '',
      duration: '',
      price: '',
      imageUrl: '',
    });
  }

  ngOnInit(): void {}

  create() {
    const values = this.createMovieForm.value;

    const movie = new Movie();
    movie.setDuration(values.duration);
    movie.setName(values.name);
    movie.setImageUrl(values.imageUrl);
    movie.setPrice(values.price);

    this.backendService.createMovie(movie, () => {
      this.dialogRef.close();
      this.createMovieForm.reset();
      document.location.reload();
    });
  }

  close() {
    this.dialogRef.close();
    this.createMovieForm.reset();
  }
}

@Component({
  selector: 'delete-movie-dialog',
  templateUrl: './delete-movie-dialog.html',
})
export class DeleteMovieDialog implements OnInit {
  public movie: Movie;
  private backendService: BackendService;

  constructor(
    backendService: BackendService,
    private dialogRef: MatDialogRef<CreateMovieDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.backendService = backendService;
  }

  ngOnInit(): void {
    this.movie = this.data.movie;
  }

  close() {
    this.dialogRef.close();
  }

  delete() {
    this.backendService.deleteMovie(this.movie.getId(), () => {
      this.dialogRef.close();
      document.location.reload();
    });
  }
}
