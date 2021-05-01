import {Component, OnInit} from '@angular/core';
import {InvocationContext} from '@app/@models/invocationContext';
import {AlertService, ProductService} from '@app/@services';
import {first} from 'rxjs/operators';

@Component({templateUrl: './product-list.component.html'})
export class ProductListComponent implements OnInit {

  products = null;

  constructor(
    private alertService: AlertService,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.productService.getAllProduct().pipe()
      .subscribe(value => {
        const ic: InvocationContext = value;
        if (ic.errorCode === 0) {
          this.products = [];
          ic.data.forEach(data => {
            (data.available === true) ? data['avalibaleDesc'] = 'Ready To Order' : data['avalibaleDesc'] = 'Out Of Order';
            this.products.push(data);
          });
        } else {
          this.alertService.error(ic.errorMessage);
        }
      });
  }

  deleteProduct(id: any) {
    const product = this.products.find(x => x.id === id);
    product.isDeleting = true;
    this.productService.deleteProduct(id)
      .pipe(first())
      .subscribe(() => {
        this.products = this.products.filter(x => x.id !== id);
      });
  }
}
