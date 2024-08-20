import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  @Input() id!: string;
  form!: FormGroup;
  loading = false;
  get idControl(): AbstractControl {
    return this.form?.get('id')!;
  }

  get nameControl(): AbstractControl {
    return this.form.get('name')!;
  }

  get descriptionControl(): AbstractControl {
    return this.form.get('description')!;
  }

  get logoControl(): AbstractControl {
    return this.form.get('logo')!;
  }

  get dateReleaseControl(): AbstractControl {
    return this.form.get('date_release')!;
  }

  get dateRevisionControl(): AbstractControl {
    return this.form.get('date_revision')!;
  }

  constructor(
    private _productsService: ProductService,
    private router: Router
  ) {

  }

  async ngOnInit() {
    await this.init();
  }

  async init() {
    this.loading = true;
    let product: Product = await this.getProduct();
    this.form = new FormGroup({
      id: new FormControl({value: product?.id || '', disabled: product?.id ? true : false}, Validators.required),
      name: new FormControl(product?.name || '', Validators.required),
      description: new FormControl(product?.description || '', Validators.required),
      logo: new FormControl(product?.logo || '', Validators.required),
      date_release: new FormControl(product?.date_release || '', Validators.required),
      date_revision: new FormControl(product?.date_revision || '', Validators.required),
    })
    this.loading = false;
  }

  async save() {
    try {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      const product: Product = this.form.value;
      if (this.id) {
        await this._productsService.editProduct(product);
      } else {
        await this._productsService.addProduct(product);
      }
      this.router.navigateByUrl('products');
    } catch(error) {
      console.log(error);
    }
  }

  clear() {
    this.form.reset();
  }

  async getProduct() {
    if (!this.id) {
      return null;
    }
    return await this._productsService.getProduct(this.id);
  }

}
