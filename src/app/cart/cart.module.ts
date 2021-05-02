import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CartLayoutComponent} from './cart-layout/cart-layout.component';
import {CartListComponent} from './cart-list/cart-list.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CartRoutingModule} from '@app/cart/cart-routing.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CartRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    CartLayoutComponent,
    CartListComponent]
})
export class CartModule {
}
