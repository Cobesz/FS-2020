import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ModuleRoutes} from './beer-collection.routes';
import {BeerCollectionComponent} from './overview/beer-collection.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {BeerDetailComponent} from "./detail/beer-detail.component";

@NgModule({
  declarations: [
    BeerCollectionComponent,
    BeerDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ModuleRoutes),
    MatCardModule,
    MatGridListModule
  ]
})
export class BeerCollectionModule {
}
