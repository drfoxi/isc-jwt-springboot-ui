import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from '@app/@models';
import {environment} from '@environments/environment';
import {Product} from '@app/@models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private router: Router,
    private http: HttpClient
  ){
  }

  getAllProduct() {
    return this.http.get(`${environment.apiUrl}/product/fetchAllProduct`);
  }

  getProductById(id) {
    return this.http.get(`${environment.apiUrl}/product/fetchProductById?id=${id}`);
  }

  addProduct(product) {
    return this.http.post(`${environment.apiUrl}/product/insertProduct`, product);
  }

  updateProduct(product) {
    return this.http.put(`${environment.apiUrl}/product/updateProduct`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.apiUrl}/product/deleteProductById/?id=${id}`);
  }
}
