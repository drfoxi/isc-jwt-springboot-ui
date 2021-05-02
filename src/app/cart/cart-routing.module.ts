import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartLayoutComponent} from '@app/cart/cart-layout/cart-layout.component';
import {CartListComponent} from '@app/cart/cart-list/cart-list.component';

const routes: Routes = [
  {
    path: '', component: CartLayoutComponent,
    children: [
      { path: '', component: CartListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
