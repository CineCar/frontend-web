import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie, MovieScreening } from 'com.cinecar.objects';
import { BackendService } from '../services/backend.service';
import { CartService } from '../services/cart.service';

@Component({
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.scss'],
})
export class EditmovieComponent implements OnInit {
  private backendService: BackendService;
  private formBuilder: FormBuilder;
  public editForm;
  public movie: Movie;
  public createMovieScreeningDialog;
  public changeMovieScreeningInformationDialog;
  public deleteMovieScreeningDialog;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    backendService: BackendService,
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.backendService = backendService;

    this.editForm = formBuilder.group({
      name: '',
      duration: 0,
      price: 0,
      imageUrl: '',
    });
  }

  ngOnInit(): void {
    this.backendService.getMovie(
      parseInt(this.route.snapshot.paramMap.get('id')),
      (movie: Movie) => {
        this.movie = movie;
        this.editForm.controls['name'].setValue(movie.getName());
        this.editForm.controls['duration'].setValue(movie.getDuration());
        this.editForm.controls['price'].setValue(movie.getPrice());
        this.editForm.controls['imageUrl'].setValue(movie.getImageUrl());
      }
    );
  }
  onSubmit() {
    let newMovie: Movie = new Movie();

    newMovie.setId(this.movie.getId());
    newMovie.setName(this.editForm.get('name').value);
    newMovie.setDuration(this.editForm.get('duration').value);
    newMovie.setPrice(this.editForm.get('price').value);
    newMovie.setImageUrl(this.editForm.get('imageUrl').value);

    this.backendService.updateMovieInformation(newMovie, (movie: Movie) => {
      this.movie = movie;
    });
  }

  createMovieScreening() {
    this.createMovieScreeningDialog = this.dialog.open(
      CreateMovieScreeningDialog,
      {
        data: this.movie,
      }
    );
  }

  changeMovieScreeningInformation(movieScreening) {
    this.changeMovieScreeningInformationDialog = this.dialog.open(
      ChangeMovieScreeningInformationDialog,
      {
        data: movieScreening,
      }
    );
  }

  deleteMovieScreening(movieScreening) {
    this.deleteMovieScreeningDialog = this.dialog.open(
      DeleteMovieScreeningDialog,
      {
        data: movieScreening,
      }
    );
  }
}

@Component({
  selector: 'delete-movie-dialog',
  templateUrl: './create-movie-screening-dialog.html',
})
export class CreateMovieScreeningDialog implements OnInit {
  public createMovieScreeningForm;
  public movie: Movie;

  constructor(
    public backendService: BackendService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateMovieScreeningDialog>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = this.data;
    this.createMovieScreeningForm = formBuilder.group({
      datetime: '',
    });
  }

  ngOnInit(): void {}

  create() {
    const values = this.createMovieScreeningForm.value;
    const movieScreening = new MovieScreening();

    let datetimeUnix = Date.parse(values.datetime + ':00');
    movieScreening.setDatetime(new Date(datetimeUnix));
    movieScreening.setMovie(this.movie);

    this.backendService.createMovieScreening(movieScreening, () => {
      document.location.reload();
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'delete-movie-dialog',
  templateUrl: './change-movie-screening-information-dialog.html',
})
export class ChangeMovieScreeningInformationDialog implements OnInit {
  public changeMovieScreeningInformationForm;
  public movieScreening: MovieScreening;

  constructor(
    public backendService: BackendService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ChangeMovieScreeningInformationDialog>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movieScreening = this.data;
    const t = new Date(this.movieScreening.getDatetime());
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    const hours = ('0' + t.getHours()).slice(-2);
    const minutes = ('0' + t.getMinutes()).slice(-2);

    this.changeMovieScreeningInformationForm = formBuilder.group({
      datetime: `${year}-${month}-${date}T${hours}:${minutes}`,
    });
  }

  ngOnInit(): void {}

  save() {
    const values = this.changeMovieScreeningInformationForm.value;
    const movieScreening = this.movieScreening;

    let datetimeUnix = Date.parse(values.datetime + ':00');
    movieScreening.setDatetime(new Date(datetimeUnix));

    this.backendService.updateMovieScreeningInformation(movieScreening, () => {
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'delete-movie-dialog',
  templateUrl: './delete-movie-screening-dialog.html',
})
export class DeleteMovieScreeningDialog implements OnInit {
  public deleteMovieScreeningForm;
  public movieScreening: MovieScreening;

  constructor(
    public backendService: BackendService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateMovieScreeningDialog>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movieScreening = this.data;
  }

  ngOnInit(): void {}

  delete() {
    this.backendService.deleteMovieScreening(
      this.movieScreening.getId(),
      () => {
        document.location.reload();
        this.dialogRef.close();
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
