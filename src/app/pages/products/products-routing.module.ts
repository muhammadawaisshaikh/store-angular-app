import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ListingComponent } from './listing/listing.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'listing',
    component: ListingComponent
  },
  {
    path: 'add-edit-product',
    component: AddEditProductComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
