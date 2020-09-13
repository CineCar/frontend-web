
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cart, Ticket } from 'com.cinecar.objects';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public tickets: Array<Ticket> ;
  public total: number; 

  constructor(private http: HttpClient, private cartService: CartService) { 

  }

  ngOnInit(): void {
    this.cartService = new CartService(this.http);

    this.cartService.getCart((cart: Cart) => {
      this.tickets = cart.getTickets();
    });

    

    this.cartService.getTotal((total) => {
      this.total = total;
    })
  }

  removeTicketFromCart(id: number) {
    this.cartService.removeTicketFromCart(id, (cart: Cart) => {this.tickets = cart.getTickets()});
  }

  showCheckoutForm() : void {

  }  
}

