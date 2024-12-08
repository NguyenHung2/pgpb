import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NhanVien } from '../model/nhanvien.model';

@Injectable({
  providedIn: 'root'
})
export class NhanvienService {
  // Đường dẫn API kết nối đến backend
  private apiUrl = 'http://localhost:8080/api/nhanvien';

  constructor(private http: HttpClient) { }

  /**
   * Lấy danh sách tất cả nhân viên từ backend
   * @returns Observable chứa danh sách nhân viên
   */
  getNhanViens(): Observable<NhanVien[]> {
    return this.http.get<NhanVien[]>(this.apiUrl); // Gửi yêu cầu GET để lấy dữ liệu
  }

  /**
   * Lấy thông tin của một nhân viên dựa vào mã nhân viên
   * @param MaNV Mã nhân viên cần tìm
   * @returns Observable chứa thông tin nhân viên
   */
  getNhanVien(MaNV: string): Observable<NhanVien> {
    return this.http.get<NhanVien>(`${this.apiUrl}/${MaNV}`); // Gửi yêu cầu GET với mã nhân viên
  }

  /**
   * Tạo mới một nhân viên
   * @param nhanVien Đối tượng chứa thông tin nhân viên cần tạo
   * @returns Observable chứa nhân viên vừa được tạo
   */
  createNhanVien(nhanVien: NhanVien): Observable<NhanVien> {
    return this.http.post<NhanVien>(this.apiUrl, nhanVien); // Gửi yêu cầu POST để tạo mới
  }

  /**
   * Cập nhật thông tin nhân viên
   * @param nhanVien Đối tượng chứa thông tin nhân viên cần cập nhật
   * @returns Observable chứa thông tin nhân viên sau khi cập nhật
   */
  updateNhanVien(nhanVien: NhanVien): Observable<NhanVien> {
    return this.http.put<NhanVien>(`${this.apiUrl}/${nhanVien.maNV}`, nhanVien); // Gửi yêu cầu PUT để cập nhật
  }

  /**
   * Xóa một nhân viên dựa vào mã nhân viên
   * @param MaNV Mã nhân viên cần xóa
   * @returns Observable để xác nhận việc xóa thành công
   */
  deleteNhanVien(MaNV: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${MaNV}`); // Gửi yêu cầu DELETE để xóa
  }
}
