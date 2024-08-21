import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../../interfaces/product.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Input() data!: Product[];
  filterData: Product[] = [];
  @Output() onsearch: EventEmitter<Product[]> = new EventEmitter<Product[]>();
  search = new FormControl('');

  searching() {
    this.filterData = this.data.filter(product => product.name.includes(this.search.value!));
    this.onsearch.emit(this.filterData)
  }

}
