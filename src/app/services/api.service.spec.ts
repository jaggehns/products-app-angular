import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Product } from 'src/models/product.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    quantity: 10,
    price: 100.0,
    description: 'Test description',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should delete a product', () => {
    const productId = 1;

    service.deleteProduct(productId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/delete/${productId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });
});
