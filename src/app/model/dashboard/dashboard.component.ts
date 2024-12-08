import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  activeTab: string = 'khachhang';  // Mặc định là tab 'Khách Hàng'

  // Hàm để thay đổi tab
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
