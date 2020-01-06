import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ModuleRoutes} from './beer-collection.routes';
import {BeerCollectionComponent} from './overview/beer-collection.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {BeerDetailComponent} from "./detail/beer-detail.component";
import {MatButtonModule} from "@angular/material/button";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    BeerCollectionComponent,
    BeerDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ModuleRoutes),
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    ScrollingModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule
  ]
})
export class BeerCollectionModule {
}
