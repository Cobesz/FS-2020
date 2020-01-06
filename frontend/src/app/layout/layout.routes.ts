import {Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';

export let ModuleRoutes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [{
      path: '',
      loadChildren: '../modules/dashboard/dashboard.module#DashboardModule',
    },
      {
        path: 'beercollection',
        loadChildren: '../modules/beer-collection/beer-collection.module#BeerCollectionModule'
      }
    ]
  }
];
