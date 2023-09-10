import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ListingComponent } from './listing/listing.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { DetailsComponent } from './details/details.component';
import { Role } from 'src/app/enums/role.enum';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canActivate: [authGuard],
    data: { roles: [Role.User] }
  },
  {
    path: 'listing',
    component: ListingComponent,
    canActivate: [authGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'add-edit-product',
    component: AddEditProductComponent,
    canActivate: [authGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'details',
    component: DetailsComponent,
    canActivate: [authGuard],
    data: { roles: [Role.User] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
