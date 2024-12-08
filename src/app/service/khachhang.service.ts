import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KhachHang } from '../model/khachhang.model';  // Import the model for type safety

@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  private apiUrl = 'http://localhost:8080/api/khachhang';  // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Get all KhachHangs from the backend
  getKhachHangs(): Observable<KhachHang[]> {
    return this.http.get<KhachHang[]>(this.apiUrl);  // Send GET request to fetch data
  }

  // Get a specific KhachHang by its maKH
  getKhachHang(maKH: string): Observable<KhachHang> {
    return this.http.get<KhachHang>(`${this.apiUrl}/${maKH}`);
  }

  // Create a new KhachHang
  createKhachHang(khachHang: KhachHang): Observable<KhachHang> {
    return this.http.post<KhachHang>(this.apiUrl, khachHang);
  }

  // Update an existing KhachHang
  updateKhachHang(khachHang: KhachHang): Observable<KhachHang> {
    return this.http.put<KhachHang>(`${this.apiUrl}/${khachHang.maKH}`, khachHang);
  }

  // Delete a KhachHang by its maKH
  deleteKhachHang(maKH: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${maKH}`);
  }
}