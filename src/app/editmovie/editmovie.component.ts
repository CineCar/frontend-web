import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css'],
})
export class EditmovieComponent implements OnInit {
  private backendService: BackendService;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.backendService = new BackendService(this.http);

    this.backendService.getMovie(
      parseInt(this.route.snapshot.paramMap.get('id')),
      (movie) => {
        console.log(movie);
      }
    );
  }
}
