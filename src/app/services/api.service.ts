import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse, Product } from 'src/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api/product';

  constructor(private http: HttpClient) {}

  postProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/addProduct`, data);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getProducts`);
  }

  getPaginatedProducts(
    page: number,
    size: number,
    search: string = ''
  ): Observable<PaginatedResponse<Product>> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse<Product>>(
      `${this.baseUrl}/getAllProducts`,
      { params }
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/productById/${id}`);
  }

  putProduct(data: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/updateProduct`, data);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
