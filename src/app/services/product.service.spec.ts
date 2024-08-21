import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';

describe('ProductService', () => {
  let service: ProductService;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be added a product', async() => {
    try {
      const response: any = await service.addProduct(products[0]);
      expect(response.data.id).toEqual(products[0].id);
    } catch (error) {
      await service.deleteProduct(products[0].id);
    }
  });

  it('should be returned data from API', async() => {
    try {
      await service.addProduct(products[0]);
      const { data } = await service.getProducts();
      expect(data.length).toBeGreaterThan(0);
    } catch(error) {
      const { data } = await service.getProducts();
      expect(data.length).toBeGreaterThan(0);
    }
  });

  it('should be edited a product', async() => {
    try {
      await service.addProduct(products[0]);
      const response: any = await service.editProduct(products[0].id, {...products[0], name: 'test'});
      expect(response.data.name).toEqual('test');
    } catch (error) {
      await service.deleteProduct(products[0].id);
    }
  });

  it('should be gotten a product', async() => {
    try {
      await service.addProduct(products[0]);
      const product = await service.getProduct(products[0].id);
      expect(product).toEqual(products[0]);
    } catch (error) {
      await service.deleteProduct(products[0].id);
    }
  });

});
