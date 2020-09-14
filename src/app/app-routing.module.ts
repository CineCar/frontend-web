import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovielistComponent } from './movielist/movielist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AdminComponent } from './admin/admin.component';
import { MoviescreeninglistComponent } from './moviescreeninglist/moviescreeninglist.component';

const routes: Routes = [
  { path: 'movies', component: MovielistComponent },
  {
    path: 'movie-screenings',
    component: MoviescreeninglistComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'cart/checkout',
    component: CheckoutComponent,
  },
  {
    path: 'login',
    component: AuthenticationComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
