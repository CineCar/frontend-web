import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  private backendService: BackendService;



  public loginForm;

  constructor(private http: HttpClient, private cartService: CartService, backendService: BackendService, formBuilder: FormBuilder ) { 

    this.backendService = backendService;

    this.loginForm = formBuilder.group({
      username:"",
      password:"",
    })
  }

  ngOnInit(): void {
  }

  onSubmit(values){

    this.backendService.login(values.username, values.password, (response) =>{});



  }

}
