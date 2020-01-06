import {Routes} from '@angular/router';
import {BeerCollectionComponent} from './overview/beer-collection.component';
import {BeerDetailComponent} from "./detail/beer-detail.component";

export let ModuleRoutes: Routes = [
  {
    path: '', component: BeerCollectionComponent,
  },
  {
    path: 'detail',
    data: {
      breadcrumb: 'Aanvragen'
    },
    children: [
      {
        path: ':id',
        component: BeerDetailComponent
      }
    ]
  }
];
