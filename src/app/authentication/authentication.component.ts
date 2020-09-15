import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  private backendService: BackendService;

  public loginForm;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    backendService: BackendService,
    formBuilder: FormBuilder,
    private router: Router
  ) {
    this.backendService = backendService;

    if (this.backendService.isLoggedIn()) {
      this.router.navigate(['/admin/movies']);
    } else {
      this.loginForm = formBuilder.group({
        username: '',
        password: '',
      });
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    this.backendService.login(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value,
      (success) => {
        if (success === true) {
          this.router.navigate(['/admin/movies']);
        } else {
        }
      }
    );
  }
}
