import {Component} from '@angular/core';

import {User} from '@app/@models';
import {AccountService, AlertService, ProductService} from '@app/@services';
import {Product} from '@app/@models/product';
import {Observable, Subscription} from 'rxjs';
import {InvocationContext} from '@app/@models/invocationContext';
// import { BsModalService, BsModalRef } from
// import {CartModule} from '@app/cart/cart.module';
@Component({templateUrl: 'home.component.html'})
export class HomeComponent {
  user: User;
  products: Product[];
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
        } else {
          this.alertService.error(ic.errorMessage);
        }
      });
  }

  openModal(e: any) {
    // // tslint:disable-next-line:no-unused-expression
    // CartModule.
    // this.bsModalRef = this.modalService.show();
    // console.log(e.target.id);
  }
}
