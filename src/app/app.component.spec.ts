import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './services/api.service';
import { PaginatedResponse, Product } from 'src/models/product.model';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const spyApiService = jasmine.createSpyObj('ApiService', [
      'getPaginatedProducts',
    ]);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatToolbarModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: ApiService, useValue: spyApiService }, MatDialog],
    }).compileComponents();

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    const mockPaginatedResponse: PaginatedResponse<Product> = {
      content: [],
      totalElements: 0,
      number: 0,
      size: 10,
    };
    apiServiceSpy.getPaginatedProducts.and.returnValue(
      of(mockPaginatedResponse)
    );

    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPaginatedProducts on ngOnInit', () => {
    expect(apiServiceSpy.getPaginatedProducts).toHaveBeenCalledWith(0, 10, '');
  });

  it('should render table headers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll('th');
    expect(headers.length).toBeGreaterThan(0);
    expect(headers[0].textContent).toContain('Id');
    expect(headers[1].textContent).toContain('Product Name');
  });

  it('should handle paginator interaction', () => {
    component.pageIndex = 1;
    component.pageSize = 5;
    fixture.detectChanges();

    expect(component.pageIndex).toBe(1);
    expect(component.pageSize).toBe(5);
  });
});
