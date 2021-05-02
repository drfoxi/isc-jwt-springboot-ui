import {Component, OnInit} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {User} from '@app/@models';
import {AccountService, AlertService, ProductService} from '@app/@services';
import {Product} from '@app/@models/product';
import {Observable, Subscription} from 'rxjs';
import {InvocationContext} from '@app/@models/invocationContext';
@Component({templateUrl: 'home.component.html'})

export class HomeComponent implements OnInit{
  user: User;
  hasProduct = true;
  products: Product[];
  isAdmin = false;
  cart = [];
  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private accountService: AccountService,
    private productService: ProductService,
    private alertService: AlertService
  ) {
    this.user = this.accountService.userValue;
    this.productService.getAllProduct().pipe()
      .subscribe(value => {
        const ic: InvocationContext = value;
        if (ic.errorCode === 0) {
          this.products = ic.data;
          this.products.length == 0 ? this.hasProduct = false : this.hasProduct = true;
        } else {
          this.alertService.error(ic.errorMessage);
        }
      });

    this.accountService.user.subscribe(x => this.user = x);
    if (this.accountService.getUserRole() === 1) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  addToCart(e: any) {
    // data['avalibaleDesc'] = 'Ready To Order' : data['avalibaleDesc'] = 'Out Of Order';
    const product = this.products.filter(p => p.id == e.target.id)[0];
    product['quantity'] = 1;
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));

  }

  ngOnInit(): void {
  }
}
