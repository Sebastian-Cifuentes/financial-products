import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./private/private.routes').then(m => m.PRIVATE_ROUTES) 
    },
    {
        path: '**',
        redirectTo: ''
    }
];
