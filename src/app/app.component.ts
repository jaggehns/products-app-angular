import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'products-application-angular';
  displayedColumns: string[] = [
    'id',
    'name',
    'quantity',
    'price',
    'description',
    'action',
  ];
  dataSource = new MatTableDataSource<any>([]);
  totalProducts = 0;
  pageSize = 10;
  pageIndex = 0;
  searchValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getPaginatedProducts(this.pageIndex, this.pageSize, this.searchValue);
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, { width: '30%' })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'create') {
          this.getPaginatedProducts(
            this.pageIndex,
            this.pageSize,
            this.searchValue
          );
        }
      });
  }

  getPaginatedProducts(
    page: number = 0,
    size: number = 10,
    search: string = ''
  ) {
    this.api.getPaginatedProducts(page, size, search).subscribe({
      next: (res) => {
        this.dataSource.data = res.content;
        this.totalProducts = res.totalElements;
        this.paginator.pageIndex = res.number;
        this.paginator.length = this.totalProducts;
      },
      error: () => {
        alert('Error while fetching products');
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPaginatedProducts(this.pageIndex, this.pageSize, this.searchValue);
  }

  editProduct(row: any) {
    this.api.getProductById(row.id).subscribe({
      next: (product) => {
        this.dialog
          .open(DialogComponent, { width: '30%', data: product })
          .afterClosed()
          .subscribe((res) => {
            if (res === 'update' || res === 'delete') {
              this.getPaginatedProducts(
                this.pageIndex,
                this.pageSize,
                this.searchValue
              );
            }
          });
      },
      error: () => {
        alert('Error while fetching product details');
      },
    });
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: () => {
        alert('Product deleted successfully');
        this.getPaginatedProducts(
          this.pageIndex,
          this.pageSize,
          this.searchValue
        );
      },
      error: () => {
        alert('Error while deleting product');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchValue = filterValue.trim().toLowerCase();
    this.pageIndex = 0;
    this.getPaginatedProducts(this.pageIndex, this.pageSize, this.searchValue);
  }
}
