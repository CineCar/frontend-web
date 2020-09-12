import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../services/backend.service';
import { Cart } from 'com.cinecar.objects';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private backendService: BackendService;
  private cart: Cart;

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

  getCart(): Cart {
    this.backendService.getCart(Number(localStorage.getItem("com.cinecar.Cart.id")), (cart) => {
      this.cart = cart;
    });

    return this.cart;
  }

  addTicketToCart(movieScreeningId: number) {
    this.getCartId((id) => {
      this.backendService.addTicketToCart(id, movieScreeningId, (cart: Cart) => {
        console.log(cart);
      });
    });
  }
}
