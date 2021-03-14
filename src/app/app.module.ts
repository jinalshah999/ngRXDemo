import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppData } from './app-data';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [AppComponent, ProductsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(AppData, { delay: 1000 }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
