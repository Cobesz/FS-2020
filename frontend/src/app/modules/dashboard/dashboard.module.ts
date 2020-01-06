import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ModuleRoutes} from './dashboard.routes';
import {DashboardComponent} from './dashboard.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [
      DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ModuleRoutes),
    MatCardModule,
    MatGridListModule
  ]
})
export class DashboardModule { }
