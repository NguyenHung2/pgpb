import { Component, OnInit } from '@angular/core';
import { KhachhangService } from '../../service/khachhang.service';
import { KhachHang } from '../../model/khachhang.model';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrls: ['./khachhang.component.css'],
})
export class KhachhangComponent implements OnInit {
  khachHangs: KhachHang[] = []; // Danh sách khách hàng
  selectedKhachHang: KhachHang | null = null; // Khách hàng được chọn
  isEditing: boolean = false; // Trạng thái chỉnh sửa
  message: string = ''; // Thông báo thành công hoặc lỗi
  isFormVisible: boolean = false; // Điều khiển hiển thị form và overlay

  constructor(
    private khachhangService: KhachhangService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.loadKhachHangs();
  }

  loadKhachHangs(): void {
    this.khachhangService.getKhachHangs().subscribe((data) => {
      this.khachHangs = data;
    });
  }

  startAdding(): void {
    this.isEditing = false;
    this.selectedKhachHang = this.initNewKhachHang();
    this.isFormVisible = true; // Hiển thị form và overlay
  }

  startEditing(khachHang: KhachHang): void {
    this.isEditing = true;
    this.selectedKhachHang = { ...khachHang };
    this.isFormVisible = true; // Hiển thị form và overlay
  }

  initNewKhachHang(): KhachHang {
    const newCustomerId = this.generateCustomerId();
    return {
      maKH: newCustomerId,
      hoTen: '',
      soDienThoai: '',
      email: '',
      diaChi: '',
      ngayDangKy: new Date(),
    };
  }

  generateCustomerId(): string {
    const newId = this.khachHangs.length + 1;
    return `KH${newId.toString().padStart(3, '0')}`;
  }

  saveKhachHang(): void {
    if (this.selectedKhachHang) {
      if (this.isEditing) {
        this.updateKhachHang(this.selectedKhachHang);
      } else {
        this.createKhachHang(this.selectedKhachHang);
      }
    }
  }

  createKhachHang(khachHang: KhachHang): void {
    this.khachhangService.createKhachHang(khachHang).subscribe(() => {
      this.loadKhachHangs();
      this.message = 'Thêm khách hàng thành công!'; // Cập nhật thông báo
      this.cancelForm();
      this.clearMessageAfterDelay();
    });
  }
  
  updateKhachHang(khachHang: KhachHang): void {
    this.khachhangService.updateKhachHang(khachHang).subscribe(() => {
      this.loadKhachHangs();
      this.message = 'Cập nhật khách hàng thành công!'; // Cập nhật thông báo
      this.cancelForm();
      this.clearMessageAfterDelay();
    });
  }
  
  deleteKhachHang(maKH: string): void {
    this.khachhangService.deleteKhachHang(maKH).subscribe(() => {
      this.loadKhachHangs();
      this.message = 'Xóa khách hàng thành công!'; // Cập nhật thông báo
      this.clearMessageAfterDelay();
    });
  }  

  cancelForm(): void {
    this.selectedKhachHang = null;
    this.isEditing = false;
    this.isFormVisible = false; // Ẩn form và overlay khi hủy
  }

  clearMessageAfterDelay(): void {
    setTimeout(() => {
      this.message = ''; // Xóa thông báo sau 3 giây
    }, 3000);
  }
  
}
