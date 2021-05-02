import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home';
import {AuthGuard} from './@helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const productModule = () => import('./product/product.module').then(x => x.ProductModule);
const cartModule = () => import('./cart/cart.module').then(x => x.CartModule);

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'users', loadChildren: usersModule, canActivate: [AuthGuard]},
  {path: 'products', loadChildren: productModule, canActivate: [AuthGuard]},
  {path: 'account', loadChildren: accountModule},
  {path: 'cart', loadChildren: cartModule},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
