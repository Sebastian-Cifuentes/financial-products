import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products!: Product[];
  data!: Product[];
  selectProduct!: Product;
  showContextMenu = false;
  search = new FormControl('');
  quantity = new FormControl(5);
  page = 1;
  pages: number[] = [];

  constructor(
    private _productsService: ProductService
  ) {}

  async ngOnInit() {
    await this.getProducts();
    this.quantityProducts();
  }

  async getProducts() {
    const { data } = await this._productsService.getProducts();
    this.data = [...data];
    this.products = [...data];
  }

  async delete(id: string) {
    await this._productsService.deleteProduct(id);
    await this.getProducts();
  }

  searching() {
    this.products = this.data.filter(product => product.name.includes(this.search.value!));
  }

  setProduct(product: Product) {
    if (product.id !== this.selectProduct?.id) {
      this.showContextMenu = true;
    } else {
      this.showContextMenu = !this.showContextMenu;
    }
    this.selectProduct = product;
  }

  quantityProducts() {
    this.pages = [];
    const limit = +this.quantity.value!;
    const lastPage = Math.ceil(this.data.length / limit);
    for(let i = 0; i < lastPage; i++) {
      this.pages.push(i+1);
    }

    this.page = lastPage < this.page ? lastPage : this.page;

    const startIndex = (this.page - 1) * limit;
    const endIndex = startIndex + limit;
    this.products = this.data.slice(startIndex, endIndex);
  }

  changePage(page: number) {
      this.page = page;
      this.quantityProducts();
  }

}
