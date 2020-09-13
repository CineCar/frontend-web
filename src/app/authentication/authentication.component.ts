import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {



  public loginForm;

  constructor(private http: HttpClient, private cartService: CartService, formBuilder: FormBuilder ) { 

    this.loginForm = formBuilder.group({
      username:"",
      password:"",
    })
  }

  ngOnInit(): void {
  }

}
