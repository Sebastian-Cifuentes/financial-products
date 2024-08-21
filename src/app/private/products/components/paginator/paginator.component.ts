import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../../interfaces/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  @Input() data: Product[] = [];
  filterData: Product[] = [];
  @Output() onpaginator: EventEmitter<Product[]> = new EventEmitter<Product[]>();
  quantity = new FormControl(5);
  page = 1;
  pages: number[] = [];
  results = 0;

  ngOnInit(): void {
    this.filterProducts();
  }

  filterProducts() {
    this.pages = [];
    const limit = +this.quantity.value!;
    const lastPage = Math.ceil(this.data?.length / limit);
    for(let i = 0; i < lastPage; i++) {
      this.pages.push(i+1);
    }
    
    this.page = lastPage < this.page && lastPage !== 0 ? lastPage : this.page;
    
    const startIndex = (this.page - 1) * limit;
    const endIndex = startIndex + limit;
    this.filterData = this.data?.slice(startIndex, endIndex);
    this.results = this.filterData?.length;
    this.onpaginator.emit(this.filterData);
  }

  changePage(page: number) {
      this.page = page;
      this.filterProducts();
  }

}
