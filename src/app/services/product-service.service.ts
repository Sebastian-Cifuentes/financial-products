import { Injectable, Injector } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { Product } from '../interfaces/product.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService extends ApiServiceService {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  getProducts(): Promise<any> {
    return this.get('products');
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
    return this.get(`products/${id}`, { params });
  }



}
