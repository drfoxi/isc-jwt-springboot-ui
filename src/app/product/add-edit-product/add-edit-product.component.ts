import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AccountService, AlertService, ProductService} from '@app/@services';
import {InvocationContext} from '@app/@models/invocationContext';
import {environment} from '@environments/environment';
import {Product} from '@app/@models/product';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html'
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  singleModel = 1;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      id: [this.id],
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      preparationTime: ['', Validators.required],
      available: ['', Validators.required],
      description: ['']
    });

    if (!this.isAddMode) {
      this.productService.getProductById(this.id).pipe()
        .subscribe(value => {
          const ic: InvocationContext = value;
          if (ic.errorCode === 0) {
            const product = ic.data;
            this.f.productName.setValue(product.productName);
            this.f.productPrice.setValue(product.productPrice);
            this.f.preparationTime.setValue(product.preparationTime);
            this.f.available.setValue((product.available) === true ? '1' : '0');
            this.f.description.setValue(product.description);
          } else {
            this.alertService.error(ic.errorMessage);
          }
        });
    }else {
      this.f.available.setValue('1');
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    if (this.isAddMode) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  createProduct() {
    const isAvailable: number = this.form.value.available - 0;
    const product: Product = this.form.value;
    product.available = isAvailable;
    this.productService.addProduct(product)
      .pipe()
      .subscribe(value => {
        const ic: InvocationContext = value;
        if (ic.errorCode === 0) {
          this.alertService.success(ic.errorMessage, {keepAfterRouteChange: true});
          this.router.navigate(['.', {relativeTo: this.route}]);
        } else {
          this.alertService.error(ic.errorMessage);
          this.loading = false;
        }
      });
  }

  updateProduct() {
    const isAvailable: number = this.form.value.available - 0;
    const product: Product = this.form.value;
    product.available = isAvailable;
    this.productService.updateProduct(product)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Update successful', {keepAfterRouteChange: true});
          this.router.navigate(['..', {relativeTo: this.route}]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  test() {

  }
}
