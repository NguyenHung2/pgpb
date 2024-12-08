import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './model/dashboard/dashboard.component';
import { KhachhangComponent } from './model/khachhang/khachhang.component';
import { NhanvienComponent } from './model/nhanvien/nhanvien.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'khachhang', component: KhachhangComponent },
  { path: 'nhanvien', component: NhanvienComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
