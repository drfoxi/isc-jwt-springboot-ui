import {Component, OnInit} from '@angular/core';
import {AccountService, AlertService, CartService, ProductService} from "@app/@services";
import {InvocationContext} from "@app/@models/invocationContext";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html'
})
export class CartListComponent implements OnInit {
  products = [];
  id: string;
  loading = false;

  constructor(private accountService: AccountService,
              private cartService: CartService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit(): void {

    const dubProdicts = JSON.parse(localStorage.getItem('cart'));
    dubProdicts.forEach((value, index) => {
      if (this.products.filter(x => x.id == value.id).length != 1) {
        this.products.push(value);
      } else {
        this.products.forEach(product => {
          if (product.id == value.id) {
            product.quantity = product.quantity + 1;
          }
        });
      }
    });
    this.makeShoppingCartDataModel();
  }

  deleteProduct(id) {
    delete this.products[id];
    this.products.forEach((value, index) => {
      if (value.id == id) {
        this.products.pop();
      }
    });
  }

  registerOrderClick() {
    const data = this.makeShoppingCartDataModel();
    this.cartService.registerCardService(data)
      .pipe()
      .subscribe(value => {
        const ic: InvocationContext = value;
        if (ic.errorCode === 0) {
          this.alertService.success(ic.errorMessage + ' کد رهگیری : ' + ic.data, {keepAfterRouteChange: true});
          this.router.navigate(['/home', {relativeTo: this.route}]);
          localStorage.setItem('cart' ,null);
        } else {
          this.alertService.error(ic.errorMessage);
          this.loading = false;
        }
      });

  }

  private makeShoppingCartDataModel() {
    const datamodel = {};
    datamodel['user'] = {'id': this.accountService.userValue.id};
    datamodel['orders'] = this.makeOrderDataModel();
    return datamodel;
  }

  private makeOrderDataModel() {
    const order = [];
    this.products.forEach(obj => {
      order.push({
        product: {
          id: obj.id
        },
        quantity: obj.quantity
      });
    });
    return order;
  }
}
