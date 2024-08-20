import { Injectable, Injector } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../interfaces/product.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  getProducts(): Promise<any> {
    return this.get('products');
  }
  
  getProduct(id: string): Promise<any> { 
    return this.get(`products/${id}`);
  }
  
  addProduct(product: Product) {
    return this.post('products', product);
  }
  
  editProduct(product: Product) {
    return this.put(`products/${product.id}`, product);
  }
  
  deleteProduct(id: string) {
    const params = new HttpParams()
      .set('id', id);
    return this.delete(`products/${id}`, { params });
  }



}
