import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../services/backend.service';
import { Cart } from 'com.cinecar.objects';
import { callbackify } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private backendService: BackendService;

  constructor(private http: HttpClient) {
    this.backendService = new BackendService(this.http);
  }


  getCartId(callback) {
    if (localStorage.getItem("com.cinecar.Cart.id") == null) {
      this.backendService.createCart((cart) => {
        localStorage.setItem("com.cinecar.Cart.id", `${cart.getId()}`)
        callback(cart.getId);
      });
    } else {
      callback(localStorage.getItem("com.cinecar.Cart.id"));
    }
  }

  getCart(callback) {
    this.backendService.getCart(Number(localStorage.getItem("com.cinecar.Cart.id")), (cart) => {
      callback(cart);
    });
  }

  addTicketToCart(movieScreeningId: number, callback) {
    this.getCartId((id) => {
      this.backendService.addTicketToCart(id, movieScreeningId, (cart: Cart) => {
        callback(cart);
      });
    });
  }
  removeTicketFromCart(ticketId: number, callback){
    this.getCartId((id) => {
      this.backendService.removeTicketFromCart(id, ticketId, (cart: Cart) => {
        console.log(cart);
        callback(cart);
      });
    });
  }

  getTotal(callback) {
    let total: number;
    let cart: Cart;

    this.getCart((dbcart) =>{

      cart = <Cart>dbcart;

      for (let ticket of cart.getTickets()){
        total += ticket.getMovieScreening().getMovie().getPrice();
      }

      callback(total);
      
    });
  }
}
