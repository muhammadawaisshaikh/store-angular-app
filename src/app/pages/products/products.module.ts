import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ListingComponent } from './listing/listing.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ListingComponent,
    AddEditProductComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
