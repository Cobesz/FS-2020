import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TopbarComponent} from './topbar/topbar.component';
import {RouterModule} from '@angular/router';
import {ModuleRoutes} from './layout.routes';
import {MatSidenavModule, MatSlideToggleModule, MatToolbarModule} from '@angular/material';

@NgModule({
  declarations: [
    LayoutComponent,
    TopbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ModuleRoutes),
    MatToolbarModule,
    MatSlideToggleModule,
    MatSidenavModule
  ]
})
export class LayoutModule { }
