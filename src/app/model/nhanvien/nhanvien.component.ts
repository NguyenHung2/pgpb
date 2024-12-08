import { Component, OnInit } from '@angular/core';
import { NhanvienService } from '../../service/nhanvien.service';
import { NhanVien } from '../../model/nhanvien.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nhanvien',
  templateUrl: './nhanvien.component.html',
  styleUrls: ['./nhanvien.component.css'],
})
export class NhanvienComponent implements OnInit {
  nhanViens: NhanVien[] = [];
  selectedNhanVien: NhanVien | null = null;
  isEditing: boolean = false;
  message: string = '';
  isFormVisible: boolean = false;

  constructor(
    private nhanvienService: NhanvienService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadNhanViens();
  }

  loadNhanViens(): void {
    this.nhanvienService.getNhanViens().subscribe((data) => {
      this.nhanViens = data;
    });
  }

  startAdding(): void {
    this.isEditing = false;
    this.selectedNhanVien = this.initNewNhanVien();
    this.isFormVisible = true;
  }

  startEditing(nhanVien: NhanVien): void {
    this.isEditing = true;
    this.selectedNhanVien = { ...nhanVien };
    this.isFormVisible = true;
  }

  initNewNhanVien(): NhanVien {
    const newCustomerId = this.generateCustomerId();
    return {
      maNV: newCustomerId,
      hoTen: '',
      chucVu: '',
      soDienThoai: '',
      email: '',
      ngayVaoLam: new Date(),
      luong: 0,
    };
  }

  generateCustomerId(): string {
    const newId = this.nhanViens.length + 1; // Tổng số nhân viên hiện tại
    return `NV${newId.toString().padStart(3, '0')}`;
  }  

  saveNhanVien(): void {
    if (this.selectedNhanVien) {
      if (this.isEditing) {
        this.updateNhanVien(this.selectedNhanVien);
      } else {
        this.createNhanVien(this.selectedNhanVien);
      }
    }
  }

  createNhanVien(nhanVien: NhanVien): void {
    this.nhanvienService.createNhanVien(nhanVien).subscribe(() => {
      this.loadNhanViens();
      this.toastr.success('Thêm nhân viên thành công!');
      this.cancelForm();
    });
  }

  updateNhanVien(nhanVien: NhanVien): void {
    this.nhanvienService.updateNhanVien(nhanVien).subscribe(() => {
      this.loadNhanViens();
      this.toastr.success('Cập nhật nhân viên thành công!');
      this.cancelForm();
    });
  }

  deleteNhanVien(maNV: string): void {
    this.nhanvienService.deleteNhanVien(maNV).subscribe(() => {
      this.loadNhanViens();
      this.toastr.success('Xóa nhân viên thành công!');
    });
  }

  cancelForm(): void {
    this.selectedNhanVien = null;
    this.isEditing = false;
    this.isFormVisible = false;
  }
}
