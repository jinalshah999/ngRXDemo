import { Component, OnInit } from '@angular/core';
import { EMPTY, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  pageTitle = 'Product List';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  constructor(private productCategoryService: ProductCategoryService) {}

  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  onAdd() {}

  onSelected(categoryId: string) {}
}
