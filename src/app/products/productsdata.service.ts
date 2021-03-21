import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, merge, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, scan, tap } from 'rxjs/operators';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductsdataService {
  private productsURL = 'api/products';
  constructor(
    private http: HttpClient,
    private productcategory: ProductCategoryService
  ) {}

  getAllProducts() {
    return this.http.get(this.productsURL);
  }
  products$ = this.http.get<Product[]>(this.productsURL).pipe(
    tap((data) => {
      console.log('product ', JSON.stringify(data));
    }),
    catchError(this.handleError)
  );

  //combine 2 different data streams
  //MAP will be used to shape our data
  productswithcategories$ = combineLatest([
    this.products$,
    this.productcategory.productCategories$,
  ]).pipe(
    map(([products, category]) => {
      return products.map(
        (products) =>
          ({
            ...products,
            price: products.price * 1.5,
            category: category.find((x) => x.id == products.categoryId).name,
          } as Product)
      );
    }),
    catchError(this.handleError)
  );

  //Action Stream for add new product

  private productInsertedSubject = new Subject<Product>();
  productInsertedAction$ = this.productInsertedSubject.asObservable();

  productwithadd$ = merge(
    this.productswithcategories$,
    this.productInsertedAction$
  ).pipe(
    scan((acc: Product[], value: Product) => [...acc, value]),
    catchError(this.handleError)
  );

  addProduct(newProduct?: Product) {
    newProduct = newProduct || this.fakeProduct();
    this.productInsertedSubject.next(newProduct);
  }
  private fakeProduct() {
    return {
      id: 42,
      productName: 'Demo',
      productCode: 'demo-0042',
      description: 'Our new product',
      price: 8.9,
      categoryId: 3,
      category: 'Toolbox',
      quantityInStock: 30,
    };
  }
  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    console.log(err);
    if (err.error instanceof ErrorEvent) {
      //clientside
      errorMessage = 'Something went wrong';
    } else {
      //backendside
      errorMessage = 'error from server';
    }
    return throwError(errorMessage);
  }
}
