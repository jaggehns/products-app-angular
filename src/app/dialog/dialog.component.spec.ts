import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { DialogComponent } from './dialog.component';
import { ApiService } from '../services/api.service';
import { Product } from 'src/models/product.model';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogComponent, string>>;

  beforeEach(async () => {
    const spyApiService = jasmine.createSpyObj('ApiService', [
      'postProduct',
      'putProduct',
      'deleteProduct',
    ]);
    const spyDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        { provide: ApiService, useValue: spyApiService },
        { provide: MatDialogRef, useValue: spyDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<DialogComponent, string>
    >;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should close dialog with "create" when product is created successfully', () => {
    component.productForm.setValue({
      name: 'Test Product',
      quantity: 10,
      price: 100.0,
      description: 'Test description',
    });

    // Mock postProduct to return a successful observable
    apiServiceSpy.postProduct.and.returnValue(of({} as Product));

    // Trigger the addProduct method
    component.addProduct();

    // Expect the dialog to close with 'create'
    expect(dialogRefSpy.close).toHaveBeenCalledWith('create');
  });
});
