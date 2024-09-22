import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  // freshnessList = ['Brand New', 'Used', 'Refurbished'];
  productForm!: FormGroup;
  actionBtn: string = 'Create';
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.patchValue(this.editData);
    }
  }
  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('Product created successfully');
            this.productForm.reset();
            this.dialogRef.close('create');
          },
          error: (error) => {
            if (error.status === 400) {
              const validationErrors = error.error;
              let errorMessages = '';
              for (const key in validationErrors) {
                if (validationErrors.hasOwnProperty(key)) {
                  errorMessages += `${key}: ${validationErrors[key]}\n`;
                }
              }
              alert(`Validation Error:\n${errorMessages}`);
            } else if (error.status === 500) {
              alert(`Error: ${error.error.message || 'Something went wrong!'}`);
            } else {
              alert(`Unexpected Error: ${error.message}`);
            }
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api
      .putProduct({ ...this.productForm.value, id: this.editData.id })
      .subscribe({
        next: () => {
          alert('Product updated successfully');
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: (error) => {
          if (error.status === 400) {
            const validationErrors = error.error;
            let errorMessages = '';
            for (const key in validationErrors) {
              if (validationErrors.hasOwnProperty(key)) {
                errorMessages += `${key}: ${validationErrors[key]}\n`;
              }
            }
            alert(`Validation Error:\n${errorMessages}`);
          } else if (error.status === 500) {
            alert(`Error: ${error.error.message || 'Something went wrong!'}`);
          } else {
            alert(`Unexpected Error: ${error.message}`);
          }
        },
      });
  }

  deleteProduct() {
    this.api.deleteProduct(this.editData.id).subscribe({
      next: () => {
        alert('Product deleted successfully');
        this.dialogRef.close('delete');
      },
      error: (error) => {
        alert('Error while deleting product');
      },
    });
  }
}
