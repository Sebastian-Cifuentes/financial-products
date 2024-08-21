import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/** Interfaces */
import { Product } from '../../interfaces/product.interface';

/** Services */
import { ProductService } from '../../services/product.service';
import { FormErrorService } from '../../services/form-error.service';

/** Custom validators */
import { dateValidator } from '../../../utils/validators/date-validator';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  @Input() id!: string;
  product!: Product;
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
    private _formErrorService: FormErrorService,
    private router: Router
  ) {

  }

  async ngOnInit() {
    await this.init();
  }

  async init() {
    this.loading = true;
    await this.getProduct();
    this.form = new FormGroup({
      id: new FormControl(
        {value: this.product?.id || '', disabled: this.product?.id ? true : false},
        [Validators.required, Validators.maxLength(10), Validators.minLength(3)]),
      name: new FormControl(
        this.product?.name || '',
        [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
      description: new FormControl(
        this.product?.description || '',
        [Validators.required, Validators.maxLength(200), Validators.minLength(10)]),
      logo: new FormControl(
        this.product?.logo || '',
        Validators.required),
      date_release: new FormControl(
        this.product?.date_release || '',
        [Validators.required, dateValidator]),
      date_revision: new FormControl(
        {value: this.product?.date_revision || '', disabled: true},
        Validators.required),
    })
    this.loading = false;
  }

  async save() {
    try {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      const product: Product = this.form.getRawValue();
      if (this.id) {
        await this._productsService.editProduct(this.id, product);
      } else {
        await this._productsService.addProduct(product);
      }
      this.router.navigateByUrl('products');
    } catch(error) {
      this.idControl.setErrors({duplicate: true});
      console.error(error);
    }
  }

  clear() {
    this.form.reset();
  }

  async getProduct() {
    if (!this.id) {
      return null;
    }
    this.product = await this._productsService.getProduct(this.id);
    return;
  }

  public getErrorMessage(field: AbstractControl): string[] {
    if (field && field.errors) {
      return this._formErrorService.mapErrors(field, "Este campo");
    }
    return [];
  }

  validateDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  setDateRevision() {
    const date = new Date(this.dateReleaseControl.value || new Date());
    date.setFullYear(date.getFullYear() + 1);
    this.dateRevisionControl.patchValue(date.toISOString().split('T')[0]);
  } 

}
