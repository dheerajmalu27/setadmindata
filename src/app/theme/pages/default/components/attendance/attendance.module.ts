import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './attendance.component';
import { LayoutModule } from '../../../../layouts/layout.module';
import { DefaultComponent } from '../../default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    "path": "",
    "component": DefaultComponent,
    "children": [
      {
        "path": "",
        "component": AttendanceComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    FormsModule,ReactiveFormsModule,CommonModule, RouterModule.forChild(routes), LayoutModule
  ], exports: [
    RouterModule
  ], declarations: [
    AttendanceComponent
  ]
})
export class AttendanceModule {



}
