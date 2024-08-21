import { Component, ViewChild, ViewChildren } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, SearchBarComponent, PaginatorComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  @ViewChild('paginator') paginator!: PaginatorComponent;
  products!: Product[];
  data!: Product[];
  selectProduct!: Product;
  showContextMenu = false;
  loading = false;

  constructor(
    private _productsService: ProductService
  ) {}

  async ngOnInit() {
    await this.getProducts();
  }

  async getProducts() {
    this.loading = true;
    const { data } = await this._productsService.getProducts();
    this.data = [...data];
    this.products = [...data];
    this.loading = false;
  }

  async deleteProduct(id: string) {
    await this._productsService.deleteProduct(id);
    await this.getProducts();
  }

  filterData(data: Product[]) {
    this.paginator.data = data;
    this.paginator.filterProducts();
  }

  triggleMenu(product: Product) {
    this.showContextMenu = product.id !== this.selectProduct?.id || !this.showContextMenu;
    this.selectProduct = product;
  }

}
