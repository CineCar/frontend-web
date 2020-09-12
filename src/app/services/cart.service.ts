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


  createCart(){

    this.backendService.createCart((cart) => {
      localStorage.setItem("com.cinecar.Cart.id", `${<Cart>cart.getId()}`)
    });

  }

  getCart(): Cart {

    if(localStorage.getItem("com.cinecar.Cart.id") == null){
      this.createCart();
    } else {

      this.backendService.getCart(Number(localStorage.getItem("com.cinecar.Cart.id")), (cart) => {
        this.cart = <Cart>cart;
      })


      return this.cart;

    }


  }
}
