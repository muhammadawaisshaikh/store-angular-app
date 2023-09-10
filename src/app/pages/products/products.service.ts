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
}
