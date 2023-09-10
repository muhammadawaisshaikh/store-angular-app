import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
MatSnackBar

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent {
  data: Product = new Product();
  addEditForm: any = FormGroup;
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    private productService: ProductsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(map(() => window.history.state)).subscribe(res => {
      this.data = res.data;
      console.log(this.data);
      
      if (this.data && Object.keys(this.data).length > 0) {
        this.isEdit = true;

        this.addEditForm.patchValue({
          title: this.data.title,
          price: this.data.price,
          category: this.data.category,
          description: this.data.description,
          image: this.data.image
        });
      }
    });

    this.formInit();
  }

  formInit() {
    this.addEditForm = this.fb.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }

  addProduct() {
    this.productService.addProduct(this.addEditForm.value).subscribe(res => {
      this._snackBar.open('Product Added Successfully!', 'close');
      this.router.navigateByUrl('/products/listing');
    });
  }

  editProduct() {
    this.productService.updateProduct(this.addEditForm.value, this.data.id).subscribe(res => {
      this._snackBar.open('Product Updated Successfully!', 'close');
      this.router.navigateByUrl('/products/listing');
    });
  }
}
