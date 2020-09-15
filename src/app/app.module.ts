import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovielistComponent } from './movielist/movielist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CartComponent } from './cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModules } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  AdminComponent,
  CreateMovieDialog,
  DeleteMovieDialog,
} from './admin/admin.component';
import { MoviescreeninglistComponent } from './moviescreeninglist/moviescreeninglist.component';
import {
  ChangeMovieScreeningInformationDialog,
  CreateMovieScreeningDialog,
  EditmovieComponent,
} from './editmovie/editmovie.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    EditmovieComponent,
    MovielistComponent,
    CheckoutComponent,
    AuthenticationComponent,
    CartComponent,
    AdminComponent,
    MovielistComponent,
    MoviescreeninglistComponent,
    ChangeMovieScreeningInformationDialog,
    CreateMovieScreeningDialog,
    CreateMovieDialog,
    DeleteMovieDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
