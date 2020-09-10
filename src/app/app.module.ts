import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovielistComponent } from './movielist/movielist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    MovielistComponent,
    CheckoutComponent,
    AuthenticationComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
