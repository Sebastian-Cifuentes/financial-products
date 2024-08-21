import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { By } from '@angular/platform-browser';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let productService: ProductService;
  const products: Product[] = [{
    id: 'trj-crd',
    date_release: '2026-12-30',
    date_revision: '2027-12-30',
    name: 'Tarjetas de crédito',
    description: 'Tarjetas de consumo bajo la modalidad de crédito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg'
  },
  {
    id: 'trj-dbt',
    date_release: '2026-02-01',
    date_revision: '2027-02-01',
    name: 'Tarjetas de debito',
    description: 'Tarjetas de consumo bajo la modalidad de debito',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg'
  }]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProductComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi())
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save a product', () => {
    const save = spyOn(productService, 'addProduct').and.callThrough();
    component.idControl.patchValue(products[0].id);
    component.nameControl.patchValue(products[0].name);
    component.descriptionControl.patchValue(products[0].description);
    component.logoControl.patchValue(products[0].logo);
    component.dateReleaseControl.patchValue(products[0].date_release);
    component.dateRevisionControl.patchValue(products[0].date_revision);
    component.save();
    expect(save).toHaveBeenCalled();
  });
  
  it('should edit a product', () => {
    component.id = products[0].id;
    const edit = spyOn(productService, 'editProduct').and.callThrough();
    component.idControl.patchValue(products[0].id);
    component.nameControl.patchValue(products[0].name);
    component.descriptionControl.patchValue(products[0].description);
    component.logoControl.patchValue(products[0].logo);
    component.dateReleaseControl.patchValue(products[0].date_release);
    component.dateRevisionControl.patchValue(products[0].date_revision);
    component.save();
    expect(edit).toHaveBeenCalled();
  });

  it('should show save title', () => {
    component.loading = false;
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.form-title')).nativeElement;
    expect(title.innerText).toEqual('Formulario de registro');
  });

  it('should show edit title', () => {
    component.loading = false;
    component.id = products[0].id;
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.form-title')).nativeElement;
    expect(title.innerText).toEqual('Editar producto');
  });

  it('should clear the product form', () => {
    component.idControl.patchValue(products[0].id);
    component.nameControl.patchValue(products[0].name);
    component.descriptionControl.patchValue(products[0].description);
    component.logoControl.patchValue(products[0].logo);
    component.dateReleaseControl.patchValue(products[0].date_release);
    component.dateRevisionControl.patchValue(products[0].date_revision);
    component.clear();
    expect(component.form.invalid).toBeTrue();
  });
});
