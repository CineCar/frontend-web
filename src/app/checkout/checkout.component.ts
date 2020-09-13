import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  public checkOutForm;

  constructor(private http: HttpClient, private cartService: CartService, formBuilder: FormBuilder ) { 

    this.checkOutForm = formBuilder.group({
      firstname:"",
      lastname:"",
      email:"",
      creditCard:"",
      pin:""
    })
  }
  ngOnInit(): void {
  }

}
