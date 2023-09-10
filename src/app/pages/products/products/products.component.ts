import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  data: any = [];
  categories: any = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.productsService.getProducts().subscribe((res: any) => {
      this.data = res;

      this.data = this.data.map((i: Product) => {
        return {
          ...i,
          truncatedDescription: `${i.description.substring(0, 60)}...`
        }
      });
    })
  }

  getCategories() {
    this.productsService.getCategories().subscribe((res: any) => {
      this.categories = res;
      console.log(this.categories);
      
    })
  }

  productByCategory(category: string) {
    this.productsService.getProductsByCategory(category).subscribe((res: any) => {
      this.data = res;

      this.data = this.data.map((i: Product) => {
        return {
          ...i,
          truncatedDescription: `${i.description.substring(0, 60)}...`
        }
      });
    })
  }

}
