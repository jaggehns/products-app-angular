import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {}

  postProduct(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addProduct`, data);
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getProducts`);
  }

  getPaginatedProducts(page: number, size: number): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.baseUrl}/getAllProducts`, { params });
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/productById/${id}`);
  }

  putProduct(data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateProduct`, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }
}
