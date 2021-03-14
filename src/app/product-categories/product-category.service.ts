import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ProductCategory } from './product-category';
import { catchError, retry, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private productCategoriesUrl = 'api/productCategories';
  constructor(private http: HttpClient) {}
  //List All Category
  productCategories$ = this.http
    .get<ProductCategory[]>(this.productCategoriesUrl)
    .pipe(
      retry(3),
      tap((data) => {
        console.log('categories', data);
      }),
      catchError(this.handleError)
    );

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
