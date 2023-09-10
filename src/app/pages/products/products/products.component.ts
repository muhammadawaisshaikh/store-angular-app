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

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
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

}
