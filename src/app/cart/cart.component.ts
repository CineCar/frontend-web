
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cart, Ticket } from 'com.cinecar.objects';
import { CartService } from '../services/cart.service';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private cartService: CartService;
  public tickets: Array<Ticket>;
  public total: number; 

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
    this.cartService = new CartService(this.http);

    this.cartService.getCart((cart: Cart) => {
      this.tickets = cart.getTickets();
    });

    

    this.total = this.cartService.getTotal();
  }
 

  
}

