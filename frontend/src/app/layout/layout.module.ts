import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TopbarComponent} from './topbar/topbar.component';
import {RouterModule} from '@angular/router';
import {ModuleRoutes} from './layout.routes';
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {DialogComponent} from '../shared/dialog/dialog.component';

@NgModule({
  declarations: [
    LayoutComponent,
    TopbarComponent,
    SidebarComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ModuleRoutes),
    MatToolbarModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  entryComponents: [DialogComponent],
})
export class LayoutModule { }
