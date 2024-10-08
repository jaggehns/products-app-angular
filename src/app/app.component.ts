import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatedResponse, Product } from 'src/models/product.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  dataSource = new MatTableDataSource<Product>([]);
  totalProducts = 0;
  pageSize = 10;
  pageIndex = 0;
  searchValue: string = '';

  searchSubject: Subject<string> = new Subject<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getPaginatedProducts(this.pageIndex, this.pageSize, this.searchValue);

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.searchValue = searchTerm;
        this.getPaginatedProducts(
          this.pageIndex,
          this.pageSize,
          this.searchValue
        );
      });
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
      next: (res: PaginatedResponse<Product>) => {
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

  editProduct(row: Product) {
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
    this.searchSubject.next(filterValue.trim().toLowerCase());
  }
}
