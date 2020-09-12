import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Cart } from 'com.cinecar.objects';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ticketshop';
  public badgeContent = 0;

  private cartService: CartService;

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    this.cartService = new CartService(this.http);

    this.cartService.getCart((cart: Cart) => {
      this.badgeContent = cart.getTickets().length;
    });
  }
}
