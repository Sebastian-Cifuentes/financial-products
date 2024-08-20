import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products!: Product[];
  selectProduct!: Product;

  constructor(
    private _productsService: ProductService
  ) {}

  async ngOnInit() {
    await this.getProducts();
  }

  async getProducts() {
    const { data } = await this._productsService.getProducts();
    this.products = data;
  }

  async delete(id: string) {
    await this._productsService.deleteProduct(id);
  }

}
