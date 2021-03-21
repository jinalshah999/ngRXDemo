import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { Product } from './product';
import { ProductsdataService } from './productsdata.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productsarr: Product[];
  pageTitle = 'Product List';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  constructor(
    private productCategoryService: ProductCategoryService,
    private productdata: ProductsdataService
  ) {}
  ngOnInit(): void {
    // this.productdata.products$.subscribe((data) => {
    //   this.productsarr = data;
    // });
  }

  categories$ = this.productCategoryService.productCategories$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedActions$ = this.categorySelectedSubject.asObservable();
  onAdd() {
    this.productdata.addProduct();
  }

  onSelected(categoryId: string) {
    this.categorySelectedSubject.next(+categoryId);
  }

  products$ = combineLatest([
    this.productdata.productwithadd$,
    this.categorySelectedActions$,
  ]).pipe(
    map(([products, categoryId]) => {
      return products.filter((x) =>
        categoryId ? x.categoryId == categoryId : true
      );
    })
  );
}
