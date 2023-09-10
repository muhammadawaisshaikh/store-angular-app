import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get List of Products from API
   * @returns observable of products api response
   */
  getProducts() {
    let endpoint = `${environment.API_BASE_URL}/products`;
    return this.http.get(endpoint, this.httpOptions);
  }

  /**
   * Add Products to API
   * @returns observable of products api response after POST
   */
  addProduct(data: Product) {
    let endpoint = `${environment.API_BASE_URL}/products`;
    return this.http.post(endpoint, data, this.httpOptions);
  }

  /**
   * Update Product to API
   * @returns observable of products api response after PUT
   */
  updateProduct(data: Product, id: number) {
    let endpoint = `${environment.API_BASE_URL}/products/${id}`;
    return this.http.put(endpoint, data, this.httpOptions);
  }

  /**
   * Delete Products from API
   * @returns observable of products api response after DELETE
   */
  deleteProduct(id: number) {
    let endpoint = `${environment.API_BASE_URL}/products/${id}`;
    return this.http.delete(endpoint, this.httpOptions);
  }

}
