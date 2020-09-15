import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Cart } from 'com.cinecar.objects';
import { CartService } from './services/cart.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ticketshop';
  public badgeContent = 0;
  public languages = ['de', 'en'];

  private cartService: CartService;

  constructor(public translate: TranslateService, private http: HttpClient) {
    translate.addLangs(this.languages);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de/) ? browserLang : 'en');
  }

  ngOnInit(): void {
    this.cartService = new CartService(this.http);

    this.cartService.getCart((cart: Cart) => {
      this.badgeContent = cart.getTickets().length;
    });
  }
}
