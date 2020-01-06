import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ModuleRoutes} from './dashboard.routes';
import {DashboardComponent} from './dashboard.component';

@NgModule({
  declarations: [
      DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ModuleRoutes)
  ]
})
export class DashboardModule { }
