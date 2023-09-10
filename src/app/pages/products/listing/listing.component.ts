import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  displayedColumns: string[] = ['id', 'title', 'price', 'category', 'description', 'image', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);

  constructor(
    private productsService: ProductsService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((res: any) => {
      console.log(res);
      this.dataSource = res;
    })
  }
}
