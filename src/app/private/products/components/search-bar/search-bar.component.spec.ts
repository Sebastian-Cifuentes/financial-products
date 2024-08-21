import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from '../../../../interfaces/product.interface';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
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
      imports: [SearchBarComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    component.data = products;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search product by name', () => {
    const search = spyOn(component, 'searching').and.callThrough();
    component.search.patchValue('deb');
    expect(search).toHaveBeenCalled();
    expect(component.filterData[0]).toEqual(products[1]);
  });

  it('should show the value of the search', () => {
    component.search.patchValue('deb');
    fixture.detectChanges();
    const search = fixture.debugElement.query(By.css('.input-control')).nativeElement;
    expect(search.value).toEqual('deb');
  });
});
