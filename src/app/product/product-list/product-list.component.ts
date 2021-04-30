import { Component, OnInit } from '@angular/core';
import {InvocationContext} from '@app/@models/invocationContext';
import {AlertService, ProductService} from '@app/@services';

@Component({templateUrl: './product-list.component.html'})
export class ProductListComponent implements OnInit {

  products = null;

  constructor(
    private alertService: AlertService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getAllProduct().pipe()
      .subscribe(value => {
        const ic: InvocationContext = value;
        if (ic.errorCode === 0) {
          this.products = ic.data;
          // this.products = [];
          // ic.data.forEach(data => {
            // (data.userRole == 1) ? data['UserRoleDesc'] = 'Admin' : data['UserRoleDesc'] = 'User';
            // this.products.push(data);
          // });
        } else {
          this.alertService.error(ic.errorMessage);
        }
      });
  }

}
