
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
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

  public search: string ='';


  ngOnInit(): void {
    this.cartService = new CartService(this.http);

    this.cartService.getCart((cart: Cart) => {
      this.tickets = cart.getTickets();
      this.total = 0;

      for (let ticket of cart.getTickets()){
        this.total += ticket.getMovieScreening().getMovie().getPrice();
      }
    });
  }

  removeTicketFromCart(ticket: Ticket) {
    this.cartService.removeTicketFromCart(ticket.getId(), (cart: Cart) => {
      this.total -= ticket.getMovieScreening().getMovie().getPrice();
      this.tickets = cart.getTickets()
    });
  }
}

