import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PaginatorComponent } from './paginator.component';
import { Product } from '../../../../interfaces/product.interface';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call filterData when changes the quantity select', () => {
    component.data = products;
    const filter = spyOn(component, 'filterProducts').and.callThrough();
    component.quantity.patchValue(1);
    expect(filter).toHaveBeenCalled();
  });

  it('should changes the number of pages and change the data', () => {
    component.data = products;
    component.quantity.patchValue(1);
    expect(component.pages).toEqual([1, 2]);
    expect(component.page).toEqual(1);
    expect(component.results).toEqual(1);
    expect(component.filterData[0]).toEqual(products[0]);
  });

  it('should show the right results', () => {
    component.data = products;
    component.quantity.patchValue(2);
    fixture.detectChanges();
    const results = fixture.debugElement.query(By.css('.results')).nativeElement;
    expect(results.innerText).toEqual('2 resultados');
  });


});
