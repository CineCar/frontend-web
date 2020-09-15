import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'com.cinecar.objects';
import { BackendService } from '../services/backend.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  public checkOutForm;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    public backendService: BackendService,
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.checkOutForm = formBuilder.group({
      firstname: '',
      lastname: '',
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    const values = this.checkOutForm.value;

    this.cartService.checkoutCart(values.firstname, values.lastname, () => {
      this.cartService.resetCart(() => {
        console.log('card reset');
      });

      this.snackBar.open('Thank you for your order.', 'OK', {
        duration: 8000,
      });
    });
  }
}
