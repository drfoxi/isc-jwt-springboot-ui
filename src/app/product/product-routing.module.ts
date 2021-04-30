import { NgModule } from '@angular/core';
import { ProductLayoutComponent } from './product-layout/product-layout.component';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from '@app/product/product-list/product-list.component';
import {AddEditProductComponent} from '@app/product/add-edit-product/add-edit-product.component';

const routes: Routes = [
  {
    path: '', component: ProductLayoutComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: 'add', component: AddEditProductComponent },
      // { path: 'edit/:id', component: AddEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
