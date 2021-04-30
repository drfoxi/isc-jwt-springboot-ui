import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductLayoutComponent} from './product-layout/product-layout.component';
import {RouterModule} from '@angular/router';
import {ProductListComponent} from '@app/product/product-list/product-list.component';
import {ProductRoutingModule} from '@app/product/product-routing.module';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProductRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductLayoutComponent,
    ProductListComponent,
    AddEditProductComponent
  ]
})
export class ProductModule {
}
