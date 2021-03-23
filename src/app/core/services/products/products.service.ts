import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`/api/products`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`/api/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(`/api/products`, product);
  }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`/api/products/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete(`/api/products/${id}`);
  }
}
