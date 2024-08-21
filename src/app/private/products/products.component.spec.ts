import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { By } from '@angular/platform-browser';


import { ProductsComponent } from './products.component';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  const products: Product[] = [{
    id: 'trj-crd',
    date_release: '2026-02-01',
    date_revision: '2027-02-01',
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
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, RouterTestingModule],
      providers: [
        provideHttpClient(withInterceptorsFromDi())
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should it triggle menu in each product', () => {
    component.triggleMenu(products[0]);
    expect(component.showContextMenu).toBeTrue();
    expect(component.selectProduct).toBe(products[0]);
  });
  
  it('should return an array of product (done)', (done) => {
    spyOn(productService, 'getProducts').and.returnValue(
      Promise.resolve({data: products})
    );
    component.getProducts().then(() => {
      expect(component.products[0].name).toEqual(products[0].name);
      done();
    })
  });

  it('should DELETE a product', () => {
    const deleteProduct = spyOn(productService, 'deleteProduct').and.callThrough();
    component.deleteProduct(products[0].id);
    expect(deleteProduct).toHaveBeenCalled();
  });

});
