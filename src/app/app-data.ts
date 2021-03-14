import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { ProductCategoryData } from './product-categories/product-category-data';
import { ProductData } from './products/product-data';
import { SupplierData } from './suppliers/supplier-data';

export class AppData implements InMemoryDbService {
  createDb(): {} | Observable<{}> | Promise<{}> {
    const products = ProductData.products;
    const productCategories = ProductCategoryData.categories;
    const suppliers = SupplierData.suppliers;

    return { products, productCategories, suppliers };
  }
}
