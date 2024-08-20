import { Routes } from '@angular/router';

/** Components */
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';

export const PRIVATE_ROUTES: Routes = [
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'add-product',
        component: AddProductComponent
    },
    {
        path: '**',
        redirectTo: 'products'
    }
];

